"use client";

import NextImage from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import type { Image as SanityImage } from "@/types/image/image";

type CarouselImage = {
    image: SanityImage;
    imageAlt: string;
};

export type ThreeImageLayout = "equal" | "featured";
export type FeaturedPosition = "left" | "middle" | "right";

type ImageContainerProps = {
    images: CarouselImage[];
    className?: string;

    threeImageLayout?: ThreeImageLayout;
    featuredPosition?: FeaturedPosition;
};

export default function ImageContainer({
                                           images,
                                           className,
                                           threeImageLayout = "equal",
                                           featuredPosition = "left",
                                       }: ImageContainerProps) {
    const total = images?.length ?? 0;
    if (total === 0) return null;

    if (total === 1) {
        const item = images[0];
        const src = imageBuilder(item.image, {
            width: 1000,
            height: 1000,
            quality: 90,
            fit: "max",
        });
        if (!src) return null;

        return (
            <div className={`w-full ${className ?? ""}`}>
                <div className="relative w-full aspect-[4/3] max-h-[40vh] rounded-2xl overflow-hidden bg-egg">
                    <NextImage
                        src={src}
                        alt={item.imageAlt || "Image"}
                        fill
                        sizes="(min-width: 1024px) 950px, 100vw"
                        className=""
                        priority
                    />
                </div>
            </div>
        );
    }

    if (total === 2) {
        return (
            <div className={`w-full ${className ?? ""}`}>
                <div className="flex flex-col md:flex-row gap-4 h-full">
                    {images.map((item, idx) => {
                        const src = imageBuilder(item.image, {
                            width: 1200,
                            height: 800,
                            quality: 90,
                            fit: "crop",
                        });
                        if (!src) return null;

                        return (
                            <div
                                key={idx}
                                className="relative w-full md:basis-1/2 aspect-[4/3] overflow-hidden rounded-xl bg-egg"
                            >
                                <NextImage
                                    src={src}
                                    alt={item.imageAlt || "Image"}
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (total === 3) {
        const useFeatured = threeImageLayout === "featured";

        const featuredIdx: number =
            featuredPosition === "left" ? 0 : featuredPosition === "middle" ? 1 : 2;

        return (
            <div className={`w-full ${className ?? ""}`}>
                <div className="flex flex-col md:flex-row gap-4">
                    {images.map((item, idx) => {
                        const isMain = useFeatured && idx === featuredIdx;

                        const src = imageBuilder(item.image, {
                            width: isMain ? 1200 : 700,
                            height: 800,
                            quality: 90,
                            fit: "crop",
                        });
                        if (!src) return null;

                        const basisClass = useFeatured
                            ? isMain
                                ? "md:basis-1/2"
                                : "md:basis-1/4"
                            : "md:basis-1/3";

                        return (
                            <div
                                key={idx}
                                className={`relative w-full ${basisClass} aspect-square overflow-hidden rounded-xl bg-egg`}
                            >
                                <NextImage
                                    src={src}
                                    alt={item.imageAlt || "Image"}
                                    fill
                                    sizes="(min-width: 768px) 33vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }


    return null;
}
