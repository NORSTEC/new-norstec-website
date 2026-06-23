import type { Money } from "@/types/merch";

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type ShopifyVariant = {
  id: string; // gid://shopify/ProductVariant/...
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
  image: ShopifyImage | null;
};

export type ShopifyProductOption = {
  name: string;
  values: string[];
};

// Full product used on the product detail page.
export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  images: ShopifyImage[];
  options: ShopifyProductOption[];
  variants: ShopifyVariant[];
  availableForSale: boolean;
};

// Lightweight product used on the merch listing grid.
export type ShopifyProductListItem = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  minPrice: Money;
  maxPrice: Money;
  availableForSale: boolean;
  // The single variant id, present only when the product has exactly one variant
  // (so the card can add to cart directly). Otherwise null.
  soleVariantId: string | null;
};

// Result of creating a Shopify cart. The checkoutUrl is the source of truth for
// final price, shipping, tax, Vipps/MobilePay payment, and Gelato fulfillment.
export type ShopifyCart = {
  checkoutUrl: string;
  totalQuantity: number;
};

// One line sent from the local cart to the checkout API route.
export type CheckoutLineInput = {
  variantId: string;
  quantity: number;
};
