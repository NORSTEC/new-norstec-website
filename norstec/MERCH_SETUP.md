# Merch setup

The store uses the **Shopify Storefront API** as the single source of truth for products.
Everything customers see — products, variants (size/colour), images, descriptions, prices,
availability — is fetched live from Shopify. Sanity is only used for the hero section at the top of
the `/merch` page.

The website:

1. Lists all products from Shopify (`getShopifyProducts`).
2. Loads a single product with its variants by handle (`getShopifyProductByHandle`).
3. On checkout, creates a real Shopify cart (`cartCreate`) and redirects the customer to the
   returned `checkoutUrl` on Shopify's hosted checkout.

To show or hide a product on the website, publish/unpublish it to the **Headless** (or Online
Store) sales channel in Shopify. There are no product documents to maintain in Sanity.

## Environment variables

Add these server-side variables locally (`.env.local`) and in production:

```text
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_API_TOKEN=your-storefront-api-access-token
SHOPIFY_STOREFRONT_API_VERSION=2026-04
```

- `SHOPIFY_STORE_DOMAIN`: no `https://`, no trailing slash.
- `SHOPIFY_STOREFRONT_API_TOKEN`: the public Storefront API access token (read-only scopes). It is
  only used server-side and has no `NEXT_PUBLIC_` prefix, so it is never sent to the browser.
- `SHOPIFY_STOREFRONT_API_VERSION`: defaults to `2026-04` if omitted.

## Get the Storefront API token in Shopify

Shopify removed the legacy "custom app" Storefront API flow from the admin (stores created from
Jan 2026 only see "Build apps in Dev Dashboard"). The simplest supported way to get a Storefront
API token is the **Headless** sales channel:

1. Install **Headless** from the App Store: https://apps.shopify.com/headless
2. Shopify admin → **Sales channels → Headless**.
3. **Create storefront** → name it (e.g. `NORSTEC Website`).
4. Open the storefront → section **Storefront API**.
5. Copy the **Public access token** into `SHOPIFY_STOREFRONT_API_TOKEN`.

Headless storefronts automatically include the permissions to read products/inventory and create
carts, so no manual scope configuration is needed. The public token authenticates via the
`X-Shopify-Storefront-Access-Token` header (already used by the code).

## Sanity setup

Only the hero matters now: create and publish the `Merch page` with a hero section. The legacy
`Merch product` document type is no longer read by the website and can be ignored or removed.

## Product content

All product content lives in Shopify: title, description, images, options (size/colour), variants,
prices, and inventory. Products published to the Headless/Online Store sales channel appear
automatically on `/merch`. Product detail pages are addressed by the Shopify **handle**
(`/merch/<handle>`).

## Shopify admin setup

1. Create and activate the matching Shopify products and variants.
2. Configure inventory tracking, shipping, tax, checkout branding, and store policies.
3. Connect the products to **Gelato** for print-on-demand fulfillment (done in the Gelato/Shopify
   dashboards — no website code involved).
4. **Payments:** install and configure a Vipps/MobilePay **payment** app — either the
   *Vipps/MobilePay Payment app* (adds Vipps as a method in Shopify checkout) or the
   *Vipps/MobilePay Checkout app*. The **Companion app alone does not process payments** — it only
   adds branding and receipts. Verify under **Settings → Payments** that Vipps is active.
5. Run a complete test order before launch.

## How payment works with the headless storefront

The website never handles payment. It only generates a Shopify `cart.checkoutUrl` and redirects
there. Whatever payment methods are configured in Shopify checkout (including Vipps/MobilePay) show
up automatically. The headless storefront does not change payment behaviour.

## Notes

- Prices and availability shown on the site are live from Shopify (not cached).
- Out-of-stock variants show **Sold out** and cannot be added to the cart.
- The customer leaves the NORSTEC site only when proceeding to Shopify checkout.

## Shopify documentation

- Storefront API: https://shopify.dev/docs/api/storefront
- Create and update a cart: https://shopify.dev/docs/api/storefront/latest/mutations/cartCreate
