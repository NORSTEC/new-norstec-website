"use client";

import NextImage from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionHero as SectionHeroType } from "@/types/sections/sectionHero";

type SectionHeroProps = {
  section: SectionHeroType;
};

export default function SectionHero({ section }: SectionHeroProps) {
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

  const SubtitleOverlay = subtitle ? (
    <div className="absolute left-0 top-0 rounded-br-2xl bg-egg pr-5 py-2 md:py-0 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <span className="text-[1.25rem] sm:text-[2rem] md:text-[3rem] xl:text-[4rem] 2xl:text-[6rem] italic font-barlow uppercase z-20">
          {subtitle}
        </span>
        <span aria-hidden className="star-inline-orange z-10!" />
      </div>
    </div>
  ) : null;

  return (
    <section className="section mobile-container">
      <h1 className="text-h1 flex items-center">
        {title}
        {!subtitle && (
          <span
            aria-hidden
            className="star-inline-orange md:w-[4rem]! md:h-[4rem]! xl:w-[6rem]! xl:h-[6rem]!"
          />
        )}
      </h1>

      <div className="relative w-full overflow-hidden">
        {/* Mobil */}
        <div className="relative w-full aspect-[4/5] lg:hidden max-h-[90vh]">
          {mobileSrc ? (
            <>
              <NextImage
                src={mobileSrc}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                unoptimized
              />
              {SubtitleOverlay}
            </>
          ) : (
            <div className="w-full h-full bg-egg " />
          )}
        </div>

        {/* Desktop */}
        <div className="relative hidden w-full aspect-[16/6] lg:block">
          {desktopSrc ? (
            <>
              <NextImage
                src={desktopSrc}
                alt={title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                unoptimized
              />
              {SubtitleOverlay}
            </>
          ) : (
            <div className="w-full h-full bg-egg" />
          )}
        </div>
      </div>
    </section>
  );
}
