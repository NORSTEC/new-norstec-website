"use client";

import NextImage from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionHero as SectionHeroType } from "@/types/sections/sectionHero";

type SectionHeroProps = {
    section: SectionHeroType;
    className?: string;
};

export default function SectionHero({ section, className = "" }: SectionHeroProps) {
    const { title, subtitle, image, imageMobile } = section;

    const desktopSrc = imageBuilder(image);
    const mobileSrc = imageBuilder(imageMobile ?? image);

    const hasMobileImage = Boolean(imageMobile);

    const TextOverlay = (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-egg-static drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)]">
      <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] xl:text-[7rem] 2xl:text-[9rem] font-light font-barlow uppercase flex items-center justify-center">
        {title}
      </h1>

      {subtitle && (
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[1.75rem] sm:text-[3rem] md:text-[4rem] xl:text-[5rem] 2xl:text-[7rem] italic font-barlow font-light uppercase">
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );

    return (
      <section
        className={`section mobile-container p-0!  ${className}`}
        data-section-hero
      >
        <div className="relative w-full overflow-hidden">
          <div className="relative w-screen h-screen overflow-hidden">
            {hasMobileImage && (
              <NextImage
                src={mobileSrc}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover block md:hidden"
                priority
                unoptimized
              />
            )}

            <NextImage
              src={desktopSrc}
              alt={title}
              fill
              sizes="100vw"
              className={`object-cover ${hasMobileImage ? "hidden md:block" : "block"}`}
              priority
              unoptimized
            />
            <div className="absolute inset-0 z-5 bg-linear-to-b from-black/90 via-black/70 to-black/20" />
            {TextOverlay}
          </div>
        </div>
      </section>
    );
}
