"use client";

import { useMemo, useState } from "react";
import NextImage from "next/image";
import { motion } from "motion/react";
import { imageBuilder } from "@/app/utils/imageBuilder";
import type { Image as SanityImage } from "@/app/types/image/image";

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
    const [direction, setDirection] = useState<1 | -1>(1); // 1 = høyre, -1 = venstre

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
        setDirection(1);
        setStartIndex((prev) => (prev + 1) % total);
    };

    const handlePrev = () => {
        setDirection(-1);
        setStartIndex((prev) => (prev - 1 + total) % total);
    };

    return (
        <section className={`relative flex items-center w-full ${className ?? ""}`}>
            <button
                type="button"
                onClick={handlePrev}
                className="hidden md:flex items-center justify-center text-moody cursor-pointer"
                aria-label="Previous image"
            >
                <span className="icon icon-rounded icon-48 icon-300 icon-nofill hover:icon-filled transition-all duration-200">
                    arrow_circle_left
                </span>
            </button>

            <div className="relative flex-1 h-full">
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
                                    x: direction === 1 ? 40 : -40,
                                    opacity: 0,
                                    scale: isMain ? 0.96 : 0.94,
                                }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    scale: isMain ? 1 : 0.96,
                                }}
                                transition={{
                                    x: { duration: 0.15, ease: [0.25, 0.8, 0.5, 1] },
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
                                    sizes="(min-width: 1024px) 33vw, 100vw"
                                    className="object-cover"
                                    priority={isMain}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <button
                type="button"
                onClick={handleNext}
                className="hidden md:flex items-center justify-center text-moody cursor-pointer"
                aria-label="Next image"
            >
                <span className="icon icon-rounded icon-48 icon-300 icon-nofill hover:icon-filled transition-all duration-200">
                    arrow_circle_right
                </span>
            </button>
        </section>
    );
}