import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/merch/AddToCartButton";
import Money, { formatMoney } from "@/components/merch/Money";
import type { ShopifyProductListItem } from "@/types/shopify";

export default function ProductCard({ product }: { product: ShopifyProductListItem }) {
  const imageUrl = product.featuredImage?.url;
  const soldOut = !product.availableForSale;
  // Show "from X" when variants have different prices.
  const hasPriceRange = product.minPrice.amount !== product.maxPrice.amount;

  // Direct add-to-cart only when the product has a single variant. Multi-variant
  // products link to the detail page so the customer can pick a variant.
  const line = product.soleVariantId
    ? {
        variantId: product.soleVariantId,
        title: product.title,
        price: product.minPrice,
        slug: product.handle,
        imageUrl: imageUrl,
        imageAlt: product.featuredImage?.altText || product.title,
      }
    : null;

  return (
    <article className="flex h-full flex-col gap-5 rounded-4xl border-2 border-moody bg-egg p-5 transition-transform hover:scale-98">
      <Link href={`/merch/${product.handle}`} className="group flex flex-1 flex-col gap-5">
        <div className="aspect-square overflow-hidden rounded-3xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.featuredImage?.altText || product.title}
              width={900}
              height={900}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-h3">NORSTEC</div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-base font-medium md:text-lg">{product.title}</h2>
            {soldOut && (
              <span className="shrink-0 rounded-full border-2 border-moody px-3 py-1 text-xs uppercase text-moody">
                Sold out
              </span>
            )}
          </div>
          <p className="line-clamp-3">{product.description}</p>
          <p className="mt-auto pt-3 font-semibold">
            {hasPriceRange && <span className="font-normal">from </span>}
            <Money value={product.minPrice} />
          </p>
        </div>
      </Link>
      {line ? (
        <AddToCartButton line={line} soldOut={soldOut} className="w-full" />
      ) : (
        <Link
          href={`/merch/${product.handle}`}
          className="w-full rounded-full border-2 border-moody bg-moody px-5 py-2 text-center text-egg transition-colors hover:bg-transparent hover:text-moody"
          aria-label={`Choose options for ${formatMoney(product.minPrice)}`}
        >
          {soldOut ? "View product" : "Choose options"}
        </Link>
      )}
    </article>
  );
}
