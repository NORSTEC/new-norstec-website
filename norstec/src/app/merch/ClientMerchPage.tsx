"use client";

import ProductCard from "@/components/merch/ProductCard";
import SectionHero from "@/components/sections/SectionHero";
import type {MerchProduct} from "@/types/merch";
import type {SectionHero as SectionHeroType} from "@/types/sections/sectionHero";

type Props = {
  hero?: SectionHeroType | null;
  products: MerchProduct[];
};

export default function ClientMerchPage({hero, products}: Props) {
  return (
    <main className="w-full">
      {hero && (
        <SectionHero
          section={hero}
          className="no-snap"
          titleClassName="text-[2rem] sm:text-[3rem] md:text-[4rem] xl:text-[5rem] 2xl:text-[6rem]"
        />
      )}
      <div className="normal-section min-h-screen w-full flex flex-col items-center gap-16 desktop-container py-20! xl:py-0!">
        <div className="relative w-full">
          <section className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 py-20 min-h-screen gap-30 sm:gap-5 xl:gap-0">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {!products.length && (
              <p className="col-span-full text-center">
                No products published yet.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
