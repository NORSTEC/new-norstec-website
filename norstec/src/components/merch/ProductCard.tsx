import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/merch/AddToCartButton";
import Money from "@/components/merch/Money";
import type {MerchProduct} from "@/types/merch";
import {imageBuilder} from "@/utils/imageBuilder";

export default function ProductCard({product}: {product: MerchProduct}) {
  const image = product.images?.[0];
  const imageUrl = imageBuilder(image, {width: 900, height: 900, fit: "crop", quality: 90});

  return (
    <article className="flex h-full flex-col gap-5 rounded-4xl border-2 border-moody bg-egg p-5 transition-transform hover:scale-98">
      <Link href={`/merch/${product.slug}`} className="group flex flex-1 flex-col gap-5">
        <div className="aspect-square overflow-hidden rounded-3xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt || product.title}
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
            <h2 className="text-h3 font-medium">{product.title}</h2>
            {product.featured && (
              <span className="rounded-full bg-copper px-3 py-1 text-xs uppercase text-moody">
                Featured
              </span>
            )}
          </div>
          <p className="line-clamp-3">{product.excerpt}</p>
          <p className="mt-auto pt-3 font-semibold">
            <Money value={product.price} />
          </p>
        </div>
      </Link>
      <AddToCartButton product={product} className="w-full" />
    </article>
  );
}
