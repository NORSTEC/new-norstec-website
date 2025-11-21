"use client";

import NextImage from "next/image";
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
    if (!images || images.length === 0) return null;

    return (
        <div className={`w-full flex gap-6  ${className ?? ""}`}>
            {images.map((item) => {
                const src = imageBuilder(
                    { asset: { _ref: item.image.asset._ref } },
                    { width: 1600, height: 900, fit: "crop" }
                );

                return (
                    <div
                        key={item.image.asset._ref}
                        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden "
                    >
                        <NextImage
                            src={src}
                            alt={item.imageAlt}
                            fill
                            className="object-cover"
                        />
                    </div>
                );
            })}
        </div>
    );
}