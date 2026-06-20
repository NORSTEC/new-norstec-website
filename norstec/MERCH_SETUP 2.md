# Merch setup

The storefront reads product content from Sanity and uses Shopify Storefront API for cart and checkout.

Add these server-side environment variables:

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
SHOPIFY_STOREFRONT_API_VERSION=2026-04
```

Create a `Merch product` in Sanity for each visible item. Copy the matching Shopify global IDs into
`shopifyProductId` and `shopifyVariantId`.

Checkout, orders, taxes, shipping, inventory, and payment are owned by Shopify.

- TODO (Shopify admin): Connect the relevant products and variants to Printful.
- TODO (Shopify admin): Enable and configure Vipps for Shopify checkout.
