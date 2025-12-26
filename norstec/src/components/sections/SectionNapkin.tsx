"use client";

import NextImage from "next/image";
import { PortableText } from "next-sanity";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionNapkin as SectionNapkinType } from "@/types/sections/sectionNapkin";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";
import React from "react";

type SectionNapkinProps = {
    section: SectionNapkinType;
};

export default function SectionNapkin({ section }: SectionNapkinProps) {
    const { title, subtitle, image, imageAlt } = section;

    const src = imageBuilder(image, {
        height: 1600,
        quality: 95,
        fit: "max",
    });

    return (
        <section className="section desktop-container min-h-screen">
            <ChemtrailsRight />

            <div className="flex flex-col lg:flex-row lg:items-stretch h-full lg:gap-16 xl:gap-32">
                {/* LEFT */}
                <div className="min-w-0 lg:flex-1">
                    <h2 className="text-h2">{title}
                        <span
                            aria-hidden
                            className="star-inline"
                        />
                    </h2>

                    {subtitle?.length ? (
                        <div className="mt-4">
                            <PortableText
                                value={subtitle}
                                components={{
                                    block: {
                                        normal: ({ children }) => (
                                            <p className="mb-[1rem] last:mb-0">{children}</p>
                                        ),
                                    },
                                }}
                            />
                        </div>
                    ) : null}
                </div>

                {/* RIGHT */}
                <div className="mt-8 lg:mt-0 lg:h-full shrink-0 flex justify-center lg:justify-end">
                    {src ? (
                        <NextImage
                            src={src}
                            alt={imageAlt}
                            width={900}
                            height={2000}
                            className="h-full w-auto object-contain rounded-2xl"
                            priority
                            unoptimized
                        />
                    ) : null}
                </div>
            </div>
        </section>
    );
}
