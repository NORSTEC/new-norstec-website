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

    const desktopSrc = imageBuilder(image, {
        width: 2400,
        quality: 100,
        fit: "max",
    });

    const mobileSrc = imageBuilder(imageMobile ?? image, {
        width: 1400,
        quality: 100,
        fit: "max",
    });

  const TextOverlay = (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 text-egg drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)]">
      <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] xl:text-[7rem] 2xl:text-[8rem] font-light font-barlow uppercase flex items-center justify-center">
        {title}
        {!subtitle && (
          <span
            aria-hidden
            className="star-inline-orange md:w-[4rem]! md:h-[4rem]! xl:w-[6rem]! xl:h-[6rem]! ml-2"
          />
        )}
      </h1>

      {subtitle && (
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] xl:text-[4rem] 2xl:text-[6rem] italic font-barlow font-light uppercase">
            {subtitle}
          </span>
          <span aria-hidden className="star-inline-white" />
        </div>
      )}
    </div>
  );

    return (
      <section className={`section mobile-container p-0!  ${className}`}>
        <div className="relative w-full overflow-hidden">
          <div className="relative w-full lg:hidden h-screen overflow-hidden">
            {mobileSrc ? (
              <NextImage
                src={mobileSrc}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-egg" />
            )}
            {TextOverlay}
          </div>

          <div className="relative hidden lg:block w-screen h-screen overflow-hidden">
            {desktopSrc ? (
              <NextImage
                src={desktopSrc}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-egg" />
            )}
            <div className="absolute inset-0 z-[5] bg-gradient-to-b from-black/80 via-black/60 to-black/40" />

            {TextOverlay}
          </div>
        </div>
      </section>
    );
}
