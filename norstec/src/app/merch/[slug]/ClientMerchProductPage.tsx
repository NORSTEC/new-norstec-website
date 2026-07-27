"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/merch/AddToCartButton";
import Money from "@/components/merch/Money";
import type { ShopifyProduct } from "@/types/shopify";

// Shopify option names can be Norwegian; the site UI is English.
const OPTION_LABELS: Record<string, string> = {
  Farge: "Color",
  Størrelse: "Size",
  Størelse: "Size",
};

const optionLabel = (name: string) => OPTION_LABELS[name] ?? name;

const isColorOption = (name: string) =>
  ["color", "colour", "farge"].includes(name.toLocaleLowerCase());

const altTextFields = (altText: string | null) =>
  (altText ?? "")
    .split(/\s+[–—-]\s+/)
    .map((field) => field.trim().toLocaleLowerCase())
    .filter(Boolean);

const imageMatchesColor = (altText: string | null, color: string) =>
  altTextFields(altText).includes(color.trim().toLocaleLowerCase());

const isFrontView = (altText: string | null) =>
  altTextFields(altText).at(-1) === "front view";

export default function ClientMerchProductPage({ product }: { product: ShopifyProduct }) {
  const hasVariants = product.variants.length > 1;

  // Default to the first available variant, falling back to the first variant.
  const initialVariant = product.variants.find((v) => v.availableForSale) ?? product.variants[0];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries((initialVariant?.selectedOptions ?? []).map((o) => [o.name, o.value]))
  );

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) =>
        variant.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
      ) ?? null,
    [product.variants, selectedOptions]
  );

  const activeVariant = selectedVariant ?? initialVariant ?? null;
  const activeColor = activeVariant?.selectedOptions.find((option) =>
    isColorOption(option.name)
  )?.value;

  // Apparel image convention: "Product title – Color value – View". Match the
  // middle field against Shopify's active colour value, so this works for any
  // future garment and palette without hard-coded colour names. Products that
  // are not tagged with the convention safely fall back to their full gallery.
  const galleryImages = useMemo(() => {
    const colorImages = activeColor
      ? product.images.filter((image) => imageMatchesColor(image.altText, activeColor))
      : [];
    const images = colorImages.length > 0 ? colorImages : product.images;

    // Shopify preserves media order; only promote an explicitly labelled front
    // view while retaining the relative order of all remaining views.
    return [...images].sort(
      (first, second) => Number(isFrontView(second.altText)) - Number(isFrontView(first.altText))
    );
  }, [activeColor, product.images]);

  const [imageSelection, setImageSelection] = useState<{
    galleryKey: string | null;
    imageUrl: string;
  } | null>(null);

  // Keep a manual thumbnail choice while changing size, but reset to the front
  // view when the customer switches colour.
  const galleryKey = activeColor ?? activeVariant?.id ?? null;
  const selectedImageUrl =
    imageSelection?.galleryKey === galleryKey
      ? imageSelection.imageUrl
      : galleryImages[0]?.url ?? null;

  const primaryImage =
    galleryImages.find((image) => image.url === selectedImageUrl) ?? galleryImages[0] ?? null;
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
          imageAlt: primaryImage?.altText || product.title,
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
                alt={primaryImage.altText || product.title}
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

                return (
                  <button
                    key={image.url}
                    type="button"
                    onClick={() =>
                      setImageSelection({
                        galleryKey,
                        imageUrl: image.url,
                      })
                    }
                    className={`relative aspect-square w-20 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 bg-egg transition-colors md:w-24 ${
                      selected
                        ? "border-copper"
                        : "border-moody/25 hover:border-moody"
                    }`}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selected}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title}, image ${index + 1}`}
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
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
                          }
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
