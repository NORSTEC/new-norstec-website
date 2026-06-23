import DOMPurify from "isomorphic-dompurify";
import {shopifyStorefrontFetch} from "@/lib/shopify/client";
import type {Money} from "@/types/merch";
import type {
  CheckoutLineInput,
  ShopifyCart,
  ShopifyProduct,
  ShopifyProductListItem,
  ShopifyVariant,
} from "@/types/shopify";

// Sanity / cart lines may store a variant id as a raw number or a full GID.
// Shopify always expects the GID form: gid://shopify/ProductVariant/123456789.
export function toVariantGid(variantId: string): string | null {
  const numericId = variantId.match(/(?:ProductVariant\/)?(\d+)$/)?.[1];
  return numericId ? `gid://shopify/ProductVariant/${numericId}` : null;
}

type MoneyNode = {amount: string; currencyCode: string};

function toMoney(node: MoneyNode): Money {
  return {amount: Number(node.amount), currencyCode: node.currencyCode};
}

// ============== PRODUCT LISTING ============== //

const PRODUCTS_QUERY = `
  query Products {
    products(first: 100, sortKey: TITLE) {
      edges {
        node {
          id
          handle
          title
          description
          availableForSale
          featuredImage { url altText }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          variants(first: 2) {
            edges { node { id } }
          }
        }
      }
    }
  }
`;

type ProductListNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: {url: string; altText: string | null} | null;
  priceRange: {minVariantPrice: MoneyNode; maxVariantPrice: MoneyNode};
  variants: {edges: {node: {id: string}}[]};
};

export async function getShopifyProducts(): Promise<ShopifyProductListItem[]> {
  try {
    const data = await shopifyStorefrontFetch<{products: {edges: {node: ProductListNode}[]}}>(
      PRODUCTS_QUERY,
    );

    return data.products.edges.map(({node}) => {
      const variantEdges = node.variants.edges;
      return {
        id: node.id,
        handle: node.handle,
        title: node.title,
        description: node.description,
        featuredImage: node.featuredImage,
        minPrice: toMoney(node.priceRange.minVariantPrice),
        maxPrice: toMoney(node.priceRange.maxVariantPrice),
        availableForSale: node.availableForSale,
        soleVariantId: variantEdges.length === 1 ? variantEdges[0].node.id : null,
      };
    });
  } catch (e) {
    console.error("Failed to fetch Shopify products:", e);
    return [];
  }
}

// ============== SINGLE PRODUCT ============== //

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      descriptionHtml
      availableForSale
      images(first: 20) {
        edges { node { url altText } }
      }
      options {
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
    }
  }
`;

type VariantNode = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyNode;
  selectedOptions: {name: string; value: string}[];
  image: {url: string; altText: string | null} | null;
};

type ProductNode = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  availableForSale: boolean;
  images: {edges: {node: {url: string; altText: string | null}}[]};
  options: {name: string; values: string[]}[];
  variants: {edges: {node: VariantNode}[]};
};

export async function getShopifyProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  if (!handle) return null;

  try {
    const data = await shopifyStorefrontFetch<{product: ProductNode | null}>(
      PRODUCT_BY_HANDLE_QUERY,
      {handle},
    );
    const node = data.product;
    if (!node) return null;

    const variants: ShopifyVariant[] = node.variants.edges.map(({node: v}) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      price: toMoney(v.price),
      selectedOptions: v.selectedOptions,
      image: v.image,
    }));

    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      // Sanitize Shopify/Gelato-authored HTML before it is rendered with
      // dangerouslySetInnerHTML. Strips <script>, event handlers, etc., while
      // keeping safe formatting (tables, lists, links).
      descriptionHtml: DOMPurify.sanitize(node.descriptionHtml ?? ""),
      availableForSale: node.availableForSale,
      images: node.images.edges.map((e) => e.node),
      options: node.options,
      variants,
    };
  } catch (e) {
    console.error("Failed to fetch Shopify product:", e);
    return null;
  }
}

// ============== CART ============== //

const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: {lines: $lines}) {
      cart {
        checkoutUrl
        totalQuantity
      }
      userErrors {
        field
        message
      }
    }
  }
`;

type CartCreateResponse = {
  cartCreate: {
    cart: {checkoutUrl: string; totalQuantity: number} | null;
    userErrors: {field: string[] | null; message: string}[];
  };
};

// Creates a real Shopify cart and returns its checkoutUrl. Shopify checkout is
// the source of truth for final price, availability, shipping, tax,
// Vipps/MobilePay payment, and Gelato fulfillment.
export async function createShopifyCart(lines: CheckoutLineInput[]): Promise<ShopifyCart> {
  const cartLines = lines
    .map((line) => {
      const merchandiseId = toVariantGid(line.variantId);
      return merchandiseId ? {merchandiseId, quantity: line.quantity} : null;
    })
    .filter((line): line is {merchandiseId: string; quantity: number} => Boolean(line));

  if (!cartLines.length) {
    throw new Error("No valid variant ids to create a cart.");
  }

  const data = await shopifyStorefrontFetch<CartCreateResponse>(CART_CREATE_MUTATION, {
    lines: cartLines,
  });

  const {cart, userErrors} = data.cartCreate;

  if (userErrors.length) {
    throw new Error(userErrors.map((e) => e.message).join("; "));
  }
  if (!cart?.checkoutUrl) {
    throw new Error("Shopify did not return a checkout URL.");
  }

  return {checkoutUrl: cart.checkoutUrl, totalQuantity: cart.totalQuantity};
}
