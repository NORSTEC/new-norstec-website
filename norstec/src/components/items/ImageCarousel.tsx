"use client";

import { useMemo, useState } from "react";
import NextImage from "next/image";
import { motion } from "motion/react";
import { imageBuilder } from "@/utils/imageBuilder";
import type { Image as SanityImage } from "@/types/image/image";

type CarouselImage = {
    image: SanityImage;
    imageAlt: string;
};

type ImageCarouselProps = {
    images: CarouselImage[];
    className?: string;
};

export default function ImageCarousel({ images, className }: ImageCarouselProps) {
    const total = images?.length ?? 0;
    const [startIndex, setStartIndex] = useState(0);

    const visibleImages = useMemo(() => {
        const count = Math.min(3, total);
        const arr: (CarouselImage & { globalIndex: number })[] = [];
        for (let i = 0; i < count; i++) {
            const idx = (startIndex + i + total) % total;
            arr.push({ ...images[idx], globalIndex: idx });
        }
        return arr;
    }, [images, total, startIndex]);

    if (total === 0) return null;

    const handleNext = () => {
        setStartIndex((prev) => (prev + 1) % total);
    };

    const handlePrev = () => {
        setStartIndex((prev) => (prev - 1 + total) % total);
    };

    return (
        <section
            className={`relative items-center w-full xl:h-full  ${className ?? ""}`}
        >
            {/* DESKTOP */}
            <div className="relative flex-1 h-full hidden xl:block">
                <div className="flex h-full gap-4 sm:gap-3">
                    {visibleImages.map((item, index) => {
                        const isMain = index === 0;

                        const src = imageBuilder(item.image, {
                            width: isMain ? 1200 : 600,
                            height: 800,
                            quality: 90,
                            fit: "crop",
                        });
                        if (!src) return null;

                        return (
                            <motion.div
                                key={item.globalIndex}
                                layout
                                initial={{
                                    opacity: 0,
                                    scale: isMain ? 0.96 : 0.94,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: isMain ? 1 : 0.96,
                                }}
                                transition={{
                                    opacity: { duration: 0.25 },
                                    scale: { duration: 0.15, ease: [0.25, 0.8, 0.5, 1] },
                                    layout: {
                                        duration: 0.15,
                                        ease: [0.25, 0.8, 0.5, 1],
                                    },
                                }}
                                className={`relative h-full overflow-hidden rounded-xl bg-egg ${
                                    isMain ? "basis-1/2" : "basis-1/4"
                                }`}
                            >
                                <NextImage
                                    src={src}
                                    alt={item.imageAlt || "Image"}
                                    fill
                                    sizes="(min-width: 1280px) 33vw, 100vw"
                                    className="object-cover"
                                    priority={isMain}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* MOBIL */}
            <div className="px-[2vw] relative flex-1 xl:h-full xl:hidden">
                {(() => {
                    const current = images[startIndex];

                    const src = imageBuilder(current.image, {
                        width: 1200,
                        height: 800,
                        quality: 90,
                        fit: "crop",
                    });
                    if (!src) return null;

                    return (
                        <motion.div
                            key={startIndex}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                opacity: { duration: 0.25 },
                            }}
                            className="relative h-full w-full overflow-hidden aspect-[4/3] rounded-xl bg-egg"
                        >
                            <NextImage
                                src={src}
                                alt={current.imageAlt || "Image"}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    );
                })()}
            </div>
            <div className="flex gap-2 pt-2">
                <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-moody hover:text-egg transition-all duration-200"
                    aria-label="Previous image"
                >
                    <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200 rotate-[180deg]">
                      trending_flat
                    </span>
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-moody hover:text-egg transition-all duration-200"
                    aria-label="Next image"
                >
                    <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200 ">
                      trending_flat
                    </span>
                </button>
            </div>
        </section>
    );
}