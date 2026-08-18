"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/merch/AddToCartButton";
import Money from "@/components/merch/Money";
import type { ShopifyImage, ShopifyProduct, ShopifyVariant } from "@/types/shopify";

// Shopify option names can be Norwegian; the site UI is English.
const OPTION_LABELS: Record<string, string> = {
  Farge: "Color",
  Størrelse: "Size",
  Størelse: "Size",
};

const optionLabel = (name: string) => OPTION_LABELS[name] ?? name;

const optionsOf = (variant: ShopifyVariant | null | undefined) =>
  Object.fromEntries((variant?.selectedOptions ?? []).map((option) => [option.name, option.value]));

// Shopify links one image per variant, and nothing more. Extra shots of a
// single colourway (a back view, a sleeve detail) therefore have no variant to
// belong to, so they would otherwise show up under every colour. An image can
// opt out by naming the option value it belongs to in its alt text:
//
//   NORSTEC Logo T-Shirt, natural, back view [variant:Natural]
//
// The tag is stripped before the alt text is rendered. Untagged images stay
// shared across every variant, which is the right default for lifestyle shots
// and size charts.
const VARIANT_TAG = /\s*\[variant:([^\]]+)\]\s*/i;

// Gelato names its media with a bare UUID and copies that into the alt text,
// which is worse than no alt text at all for a screen reader.
const UUID_ONLY = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const declaredVariantValue = (altText: string | null) =>
  altText?.match(VARIANT_TAG)?.[1]?.trim() || null;

const readableAltText = (altText: string | null) => {
  const text = (altText ?? "").replace(VARIANT_TAG, " ").trim();
  return !text || UUID_ONLY.test(text) ? null : text;
};

// The option value all these variants agree on, ignoring options they differ on.
// For a colour image that is the colour; size varies across the same picture.
function sharedOptionValue(variants: ShopifyVariant[]): string | null {
  const [first, ...rest] = variants;
  if (!first) return null;

  const shared = first.selectedOptions.find(
    (option) =>
      option.value !== "Default Title" &&
      rest.every((variant) =>
        variant.selectedOptions.some((o) => o.name === option.name && o.value === option.value)
      )
  );

  return shared?.value ?? null;
}

export default function ClientMerchProductPage({ product }: { product: ShopifyProduct }) {
  const hasVariants = product.variants.length > 1;

  // Default to the first available variant, falling back to the first variant.
  const initialVariant = product.variants.find((v) => v.availableForSale) ?? product.variants[0];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    optionsOf(initialVariant)
  );

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) =>
        variant.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
      ) ?? null,
    [product.variants, selectedOptions]
  );

  const activeVariant = selectedVariant ?? initialVariant ?? null;

  // Shopify's own variant-to-image link is the source of truth. Gelato-synced
  // products have UUID alt texts, so nothing can be inferred from those.
  const variantsByImageUrl = useMemo(() => {
    const map = new Map<string, ShopifyVariant[]>();
    for (const variant of product.variants) {
      const url = variant.image?.url;
      if (!url) continue;
      map.set(url, [...(map.get(url) ?? []), variant]);
    }
    return map;
  }, [product.variants]);

  // Prefer the product-level image object, which carries the alt text.
  const activeVariantImage = useMemo(() => {
    const url = activeVariant?.image?.url;
    if (!url) return null;
    return product.images.find((image) => image.url === url) ?? activeVariant?.image ?? null;
  }, [activeVariant, product.images]);

  // Every variant image stays visible in Shopify's order, because the thumbnails
  // double as a variant picker: hiding the other variants' images would leave
  // nothing to pick, and reordering them would move a thumbnail out from under
  // the cursor mid-click. Only the extra shots are filtered, and only when they
  // say which variant they belong to.
  const galleryImages = useMemo(() => {
    const activeValues = new Set(
      Object.values(optionsOf(activeVariant)).map((value) => value.toLocaleLowerCase())
    );

    return product.images.filter((image) => {
      if (variantsByImageUrl.has(image.url)) return true;
      const declared = declaredVariantValue(image.altText);
      return !declared || activeValues.has(declared.toLocaleLowerCase());
    });
  }, [product.images, variantsByImageUrl, activeVariant]);

  // A thumbnail the customer picked by hand. Cleared whenever they change an
  // option, so switching colour always shows that colour rather than keeping a
  // shared lifestyle shot on screen.
  const [manualImageUrl, setManualImageUrl] = useState<string | null>(null);

  const primaryImage =
    galleryImages.find((image) => image.url === manualImageUrl) ??
    activeVariantImage ??
    galleryImages[0] ??
    null;

  const selectOption = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
    setManualImageUrl(null);
  };

  // Picking a thumbnail selects the variant it belongs to, keeping as much of
  // the current selection as possible: choosing a colour must not reset size.
  const selectImage = (image: ShopifyImage) => {
    setManualImageUrl(image.url);

    const candidates = variantsByImageUrl.get(image.url);
    if (!candidates?.length) return;

    const score = (variant: ShopifyVariant) =>
      variant.selectedOptions.filter((option) => selectedOptions[option.name] === option.value)
        .length + (variant.availableForSale ? 0.5 : 0);

    const best = candidates.reduce((a, b) => (score(b) > score(a) ? b : a));
    setSelectedOptions(optionsOf(best));
  };

  const soldOut = activeVariant ? !activeVariant.availableForSale : !product.availableForSale;

  // Wrap Shopify's HTML tables (e.g. size charts) so wide ones scroll on mobile.
  const descriptionHtml = product.descriptionHtml
    .replace(/<table/g, '<div class="merch-table-scroll"><table')
    .replace(/<\/table>/g, "</table></div>");

  const line =
    activeVariant && !soldOut
      ? {
          variantId: activeVariant.id,
          title:
            activeVariant.title && activeVariant.title !== "Default Title"
              ? `${product.title} – ${activeVariant.title}`
              : product.title,
          price: activeVariant.price,
          slug: product.handle,
          imageUrl: primaryImage?.url,
          imageAlt: readableAltText(primaryImage?.altText ?? null) ?? product.title,
        }
      : null;

  return (
    <main className="h-auto!">
      <div className="desktop-container pb-0!">
        <Link
          href="/merch"
          className="inline-flex items-center gap-2 rounded-full border-2 border-moody bg-moody px-5 py-2 text-egg transition-colors hover:bg-transparent hover:text-moody"
        >
          <span className="material-symbols-outlined rotate-180">trending_flat</span>
          Back to merch
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 desktop-container pt-10!">
        <div className="min-w-0">
          <div className="aspect-square overflow-hidden rounded-4xl border-2 border-moody">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={readableAltText(primaryImage.altText) ?? product.title}
                width={1400}
                height={1400}
                className="h-full w-full object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center text-h2">NORSTEC</div>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div
              className="mt-4 flex gap-3 overflow-x-auto pb-2"
              role="group"
              aria-label="Product images"
            >
              {galleryImages.map((image, index) => {
                const selected = image.url === primaryImage?.url;
                const variantValue = sharedOptionValue(variantsByImageUrl.get(image.url) ?? []);

                return (
                  <button
                    key={image.url}
                    type="button"
                    onClick={() => selectImage(image)}
                    className={`relative aspect-square w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 bg-egg transition-colors md:w-24 ${
                      selected
                        ? "border-copper"
                        : "border-moody/25 hover:border-moody"
                    }`}
                    aria-label={
                      variantValue ? `Select ${variantValue}` : `View product image ${index + 1}`
                    }
                    aria-pressed={selected}
                  >
                    <Image
                      src={image.url}
                      alt={
                        readableAltText(image.altText) ??
                        `${product.title}, image ${index + 1}`
                      }
                      width={240}
                      height={240}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <h1 className="text-h2">{product.title}</h1>
          <p className="mt-6 text-h3">
            <Money value={activeVariant?.price} />
          </p>

          {hasVariants && (
            <div className="mt-8 space-y-6">
              {product.options.map((option) => (
                <div key={option.name}>
                  <p className="mb-3 uppercase tracking-[0.18em] text-copper">
                    {optionLabel(option.name)}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {option.values.map((value) => {
                      const selected = selectedOptions[option.name] === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => selectOption(option.name, value)}
                          className={`rounded-full border-2 border-moody px-4 py-2 transition-colors cursor-pointer ${
                            selected
                              ? "bg-moody text-egg"
                              : "bg-transparent text-moody hover:bg-moody hover:text-egg"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <AddToCartButton line={line} soldOut={soldOut} className="mt-8 w-full md:w-fit" />

          {product.descriptionHtml ? (
            <div
              className="merch-description mt-10 space-y-4 border-t-2 border-moody pt-8"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}
