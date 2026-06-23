"use client";

import ProductCard from "@/components/merch/ProductCard";
import SectionHero from "@/components/sections/SectionHero";
import type {ShopifyProductListItem} from "@/types/shopify";
import type {SectionHero as SectionHeroType} from "@/types/sections/sectionHero";

type Props = {
  hero?: SectionHeroType | null;
  products: ShopifyProductListItem[];
};

export default function ClientMerchPage({hero, products}: Props) {
  return (
    <main className="w-full">
      {hero && (
        <SectionHero section={hero} className="no-snap" />
      )}
      <div className="desktop-container w-full">
        <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 3xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {!products.length && (
            <p className="col-span-full text-center">No products published yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
