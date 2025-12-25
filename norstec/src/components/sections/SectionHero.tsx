"use client";

import NextImage from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionHero as SectionHeroType } from "@/types/sections/sectionHero";

type SectionHeroProps = {
    section: SectionHeroType;
};

export default function SectionHero({ section }: SectionHeroProps) {
    const { title, subtitle, image } = section;

    const src = imageBuilder(image, {
        width: 2400,
        quality: 90,
        fit: "max",
    });

    return (
        <section className="section mobile-container py-20">
                <h1 className="text-h1">
                    {title}
                    {!subtitle && (
                        <span
                            aria-hidden
                            className="star-inline-orange"
                        />
                    )}
                </h1>

            <div className="relative w-full overflow-hidden rounded-2xl">
                {src ? (
                    <div className="relative w-full aspect-[16/6]">
                        <NextImage
                            src={src}
                            alt={title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                        {subtitle && (
                            <div className="absolute left-0 top-0 rounded-br-2xl bg-egg pr-5">
                                <div className="flex items-center gap-2">
                                    <span className="text-[3rem] md:text-[5rem] xl:text-[5rem] 2xl:text-[7rem] italic font-barlow uppercase;">
                                        {subtitle}
                                    </span>
                                    <span
                                        aria-hidden
                                        className="star-inline-orange"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Fallback hvis imageBuilder ikke klarer å bygge URL
                    <div className="w-full aspect-[16/7] bg-egg" />
                )}
            </div>
        </section>
    );
}
