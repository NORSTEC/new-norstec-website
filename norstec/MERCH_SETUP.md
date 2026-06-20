# Merch setup

The recommended MVP uses a custom local cart and Shopify cart permalinks. It does not use the
Shopify Storefront API or require the Headless sales channel.

Sanity owns product content, images, and the prices displayed on the NORSTEC website. Shopify owns
checkout, final pricing, availability, shipping, tax, payment, orders, Vipps, and Printful
fulfillment.

## Environment variable

Add this server-side environment variable locally and in production:

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
```

Do not include `https://` or a trailing slash.

No Storefront access token or Storefront API version is required.

## How checkout works

The cart is stored in the browser's LocalStorage. Each cart line contains the Shopify variant ID,
quantity, and a small Sanity product snapshot used to render the custom cart UI.

When the customer clicks **Checkout**, the website generates a Shopify cart permalink:

```text
https://your-store.myshopify.com/cart/123456789:2,987654321:1
```

Sanity can store a Shopify variant ID as either a numeric ID or a Shopify GID:

```text
123456789
gid://shopify/ProductVariant/123456789
```

The website extracts the numeric ID when it builds the permalink.

The permalink sends the customer directly to Shopify with the selected variants and quantities.
Shopify checkout is the source of truth for final price, availability, discounts, shipping, tax,
Vipps payment, and Printful fulfillment.

## Sanity setup

1. Create and publish the `Merch page` with a hero section.
2. Create one `Merch product` document for each item.
3. Add the product title, slug, description, and images.
4. Add the price and three-letter currency code displayed on the website, for example `NOK`.
5. Copy the matching Shopify IDs into:

```text
shopifyProductId=gid://shopify/Product/...
shopifyVariantId=gid://shopify/ProductVariant/...
```

6. Enable **Visible in store** and publish the product.

Each Sanity product currently connects to one Shopify variant.

## Shopify admin setup

1. Create and activate the matching Shopify products and variants.
2. Keep the Sanity displayed prices aligned with Shopify prices.
3. Configure inventory, shipping, tax, checkout branding, and store policies.
4. Connect the relevant products and variants to Printful.
5. Enable and configure Vipps for Shopify checkout.
6. Run a complete test order before launch.

## Important limitations

- Displayed prices and cart totals come from Sanity and are estimates until Shopify checkout.
- Product availability is not checked before checkout.
- If a Shopify variant ID changes, update the matching Sanity product.
- Selling plans do not work with cart permalinks.
- The customer leaves the NORSTEC website only when proceeding to Shopify checkout.

## Shopify documentation

- Cart permalinks:
  https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks
