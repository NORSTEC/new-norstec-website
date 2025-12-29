"use client";

import Image from "next/image";
import Link from "next/link";
import { SponsorPage } from "@/types/sections/sectionSponsor";
import { imageBuilder } from "@/utils/imageBuilder";
import StripesVertical from "@/components/items/stripes/StripesVertical";

type Props = {
    sponsorPage: SponsorPage;
};

function chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

const isExternalUrl = (url?: string) =>
    url ? /^https?:\/\//.test(url) : false;

export default function ClientSponsorPage({ sponsorPage }: Props) {
    const sections = [
        sponsorPage.sectionOne,
        sponsorPage.sectionTwo,
        sponsorPage.sectionThree,
        sponsorPage.sectionFour,
    ];

    // Images per snap section
    const snapSizes = [1, 3, 9, 18];

    return (
        <main className="relative">
            <StripesVertical side={"right"} duration={1.5} />
            <section className="section py-20 text-center">
                <h1 className="text-9xl font-bold uppercase tracking-wide">
                    {sponsorPage.title}
                </h1>

                {sponsorPage.description && (
                    <p className="mt-6 max-w-2xl mx-auto text-base opacity-80">
                        {sponsorPage.description}
                    </p>
                )}
            </section>

            {sections.map((section, index) => {
                if (!section?.images?.length) return null;

                const imagesPerSnap = snapSizes[index] ?? 1;
                const imageGroups = chunkArray(section.images, imagesPerSnap);

                return (
                    <div key={index}>
                        <section
                            className="section flex items-center justify-center py-12"
                            aria-labelledby={`section-title-${index}`}
                        >
                            <h2
                                id={`section-title-${index}`}
                                className="text-9xl font-semibold uppercase tracking-wide text-center"
                            >
                                {section.title}
                            </h2>
                        </section>


                        {imageGroups.map((group, groupIndex) => (
                            <section
                                key={groupIndex}
                                className={`section flex items-center justify-center ${
                                    index === 0 ? "h-screen" : ""
                                }`}
                                aria-label={`${section.title} logos, group ${groupIndex + 1}`}
                            >
                                <div
                                    className={`grid gap-10 px-6 ${
                                        index === 0
                                            ? "grid-cols-1"
                                            : index === 1
                                                ? "grid-cols-2 md:grid-cols-3"
                                                : index === 2
                                                    ? "grid-cols-2 md:grid-cols-5"
                                                    : "grid-cols-3 md:grid-cols-6"
                                    }`}
                                >
                                    {group.map((item) => {
                                        const src = imageBuilder(item.image, {
                                            width: index === 0 ? 2400 : 800,
                                            quality: 90,
                                            fit: "max",
                                        });

                                        const ariaLabel = item.url
                                            ? `Visit sponsor website: ${item.alt}`
                                            : `Sponsor logo: ${item.alt}`;

                                        // External URL
                                        if (item.url && isExternalUrl(item.url)) {
                                            return (
                                                <a
                                                    key={item._key}
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={ariaLabel}
                                                    className="flex items-center justify-center"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={item.alt}
                                                        width={index === 0 ? 2400 : 320}
                                                        height={index === 0 ? 1400 : 160}
                                                        className="object-contain max-h-[80vh]"
                                                        priority={index === 0}
                                                        unoptimized
                                                    />
                                                </a>
                                            );
                                        }

                                        // Internal URL
                                        if (item.url) {
                                            return (
                                                <Link
                                                    key={item._key}
                                                    href={item.url}
                                                    aria-label={ariaLabel}
                                                    className="flex items-center justify-center"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={item.alt}
                                                        width={index === 0 ? 2400 : 320}
                                                        height={index === 0 ? 1400 : 160}
                                                        className="object-contain max-h-[80vh]"
                                                        priority={index === 0}
                                                        unoptimized
                                                    />
                                                </Link>
                                            );
                                        }

                                        // No URL (non-clickable)
                                        return (
                                            <div
                                                key={item._key}
                                                aria-label={ariaLabel}
                                                className="flex items-center justify-center"
                                            >
                                                <Image
                                                    src={src}
                                                    alt={item.alt}
                                                    width={index === 0 ? 2400 : 320}
                                                    height={index === 0 ? 1400 : 160}
                                                    className="object-contain max-h-[80vh]"
                                                    priority={index === 0}
                                                    unoptimized
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        ))}
                    </div>
                );
            })}
        </main>
    );
}
