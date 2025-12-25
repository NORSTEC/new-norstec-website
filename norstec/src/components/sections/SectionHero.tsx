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
        <div className="absolute left-0 top-0 rounded-br-2xl bg-egg pr-5">
            <div className="flex items-center gap-2">
                <span className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] xl:text-[4rem] 2xl:text-[6rem] italic font-barlow uppercase">
                    {subtitle}
                </span>
                <span aria-hidden className="star-inline-orange" />
            </div>
        </div>
    ) : null;

    return (
        <section className="section mobile-container">
            <h1 className="text-h1">
                {title}
                {!subtitle && <span aria-hidden className="star-inline-orange" />}
            </h1>

            <div className="relative w-full overflow-hidden rounded-2xl">
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
                            />
                            {SubtitleOverlay}
                        </>
                    ) : (
                        <div className="w-full h-full bg-egg" />
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
