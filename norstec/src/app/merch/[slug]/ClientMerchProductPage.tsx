"use client";

import Image from "next/image";
import Link from "next/link";
import {PortableText} from "next-sanity";
import AddToCartButton from "@/components/merch/AddToCartButton";
import Money from "@/components/merch/Money";
import type {MerchProduct} from "@/types/merch";
import {imageBuilder} from "@/utils/imageBuilder";

export default function ClientMerchProductPage({product}: {product: MerchProduct}) {
  const primaryImage = product.images?.[0];
  const primaryImageUrl = imageBuilder(primaryImage, {
    width: 1400,
    height: 1400,
    fit: "crop",
    quality: 95,
  });

  return (
    <main className="h-auto!">
      <div className="desktop-container pb-0!">
        <div className="flex items-center justify-between gap-4">
          <Link href="/merch" className="inline-flex items-center gap-2 hover:text-copper">
            <span className="material-symbols-outlined rotate-180">trending_flat</span>
            Back to merch
          </Link>
          <Link href="/cart" className="inline-flex items-center gap-2 hover:text-copper">
            Cart <span className="material-symbols-outlined">shopping_bag</span>
          </Link>
        </div>
      </div>

      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16 desktop-container">
        <div className="space-y-5">
          <div className="aspect-square overflow-hidden rounded-4xl border-2 border-moody">
            {primaryImageUrl ? (
              <Image
                src={primaryImageUrl}
                alt={primaryImage?.alt || product.title}
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
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => {
                const url = imageBuilder(image, {width: 500, height: 500, fit: "crop"});
                return url ? (
                  <Image
                    key={`${image.asset._ref}-${index}`}
                    src={url}
                    alt={image.alt || product.title}
                    width={500}
                    height={500}
                    className="aspect-square rounded-3xl border-2 border-moody object-cover"
                    unoptimized
                  />
                ) : null;
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center lg:py-10">
          {product.featured && (
            <p className="mb-4 uppercase tracking-[0.18em] text-copper">Featured product</p>
          )}
          <h1 className="text-[2rem] sm:text-[3rem] md:text-[4rem] xl:text-[5rem] 2xl:text-[6rem] font-thin uppercase">
            {product.title}
          </h1>
          <p className="mt-5 text-h3">{product.excerpt}</p>
          <p className="mt-8 text-h2 font-medium">
            <Money value={product.price} />
          </p>
          <AddToCartButton product={product} className="mt-8 w-full md:w-fit" />
          {product.description?.length ? (
            <div className="mt-10 space-y-4 border-t-2 border-moody pt-8">
              <PortableText value={product.description as never} />
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
