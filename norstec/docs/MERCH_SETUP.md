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
   _Vipps/MobilePay Payment app_ (adds Vipps as a method in Shopify checkout) or the
   _Vipps/MobilePay Checkout app_. The **Companion app alone does not process payments** — it only
   adds branding and receipts. Verify under **Settings → Payments** that Vipps is active.
5. Run a complete test order before launch.

## Category tags

The category filter on `/merch` is built from **namespaced tags** on the Shopify product, so
ordinary tags ("core", "jul", "sommer", a campaign name) can be used freely without turning into
filter buttons. Only tags starting with `kategori:` become categories, and the prefix is stripped
before the label is shown.

The taxonomy is broad on purpose: one bucket per shelf a customer would look on, not one per
product. A category with a single product in it is a category that is not worth clicking.

| Tag | Contains |
| --- | --- |
| `kategori:klær` | T-shirts, hoodies, sweaters, jackets |
| `kategori:hodeplagg` | Caps, beanies, bucket hats |
| `kategori:drikke` | Mugs, bottles, thermoses |
| `kategori:tilbehør` | Phone cases, tote bags, stickers, pins, patches |

Rules:

- Lowercase, Norwegian, singular bucket name.
- A product may carry several category tags — it then shows under each.
- Products with no category tag are still searchable and still show under **All**, but disappear
  when a category is selected. Every product should have at least one.
- Split a bucket (for example `kategori:klær` into shirts and knitwear) only once it holds enough
  products that browsing it gets tedious — roughly six or more.

`productType` is **not** used for this. Gelato sets it to "Print Material" on every synced product,
so it has no filtering value. Shopify collections were not used either: they are an ordering and
merchandising tool, and tags keep the filter definition next to the product itself.

### Applying the tags

Tags can be edited by hand in the Shopify admin (**Products → product → Tags**), or in bulk with
the repo script, which reads the taxonomy from a handle-to-category map:

```bash
node scripts/shopify-category-tags.mjs
```

It prints the plan and changes nothing. Add `--apply` to write. It needs an Admin API access token
with the `write_products` scope in `.env.local`:

```
SHOPIFY_ADMIN_API_TOKEN=shpat_...
```

Create it under **Settings → Apps and sales channels → Develop apps**. The token is only used by
this script — the website itself talks to the read-only Storefront API. Tags are added, never
replaced; pass `--remove <tag> [<tag>...]` to clear obsolete ones.

When a new product is added to the store, add its handle to `CATEGORIES` in the script and re-run
it.

## Images and variants

Shopify links **one image per variant**, and the product page treats that link as the source of
truth: selecting an option shows that variant's image, and selecting a thumbnail selects the variant
the image belongs to. Nothing is inferred from file names or image order.

So when a colour shows the wrong picture, the fix is in Shopify, not in the code: **Products →
product → Variants → the variant → Media**. Mis-assignments usually appear on variants Gelato synced
after the others.

Images no variant points at (lifestyle shots, size charts) are shared: they show under every
variant. That is wrong for an extra shot of one specific colourway — a back view of the natural tee
should not appear while navy is selected — and Shopify has no field for it, since a variant holds
only its one image. Such an image can name the option value it belongs to in its **alt text**:

```
NORSTEC Logo T-Shirt, natural, back view [variant:Natural]
```

The value must match the Shopify option value exactly (case is ignored). It works for any option,
not just colour — `[variant:iPhone 15 Pro]` is equally valid. The tag is stripped before the alt
text is rendered, so write the human sentence first and leave the tag at the end.

Untagged images stay shared, which is the right default for anything that is not colourway-specific.

Alt text is otherwise plain accessibility text: it is read aloud by screen readers and follows the
line into the cart. Gelato fills it with the media UUID, which the site ignores and replaces with the
product title, but writing a real sentence is better than either.

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
