"use client";

import { useRouter } from "next/navigation";
import NextImage from "next/image";
import React from "react";

import { imageBuilder } from "@/utils/imageBuilder";
import { Application } from "@/types/application/application";
import {PortableText} from "next-sanity";

type ApplicationCardProps = {
    application: Application;
};

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
    const router = useRouter();

    const [{ width }, setSize] = React.useState({ width: 0 });

    React.useEffect(() => {
        const setDims = () => setSize({ width: window.innerWidth });
        setDims();
        window.addEventListener("resize", setDims);
        return () => window.removeEventListener("resize", setDims);
    }, []);

    const isXL = width >= 1280;
    const borderClass = isXL ? "border-moody" : "border-sky";

    const handleClick = () => {
        if (application.slug?.current) {
            router.push(`/join/${application.slug.current}`);
        }
    };

    const imageSrc = application.landingImage
        ? imageBuilder(application.landingImage, {
            width: 800,
            height: 800,
            quality: 90,
            fit: "crop",
        })
        : null;

    return (
        <article
            onClick={handleClick}
            className={`relative overflow-hidden rounded-4xl bg-egg hover:scale-98 transition-all duration-200 cursor-pointer p-5 flex flex-col gap-4 border-2 xl:border ${borderClass}`}
        >
            {/* Image */}
            <div className="flex items-center justify-center">
                <div className="w-full aspect-square overflow-hidden rounded-xl">
                    {imageSrc ? (
                        <NextImage
                            src={imageSrc}
                            alt={application.title}
                            className="w-full h-full object-fill"
                            width={400}
                            height={400}
                            unoptimized
                        />
                    ) : (
                        <NextImage
                            src="/images/landing.jpeg"
                            alt=""
                            className="w-full h-full object-cover"
                            width={400}
                            height={400}
                        />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
                {application.title && (
                    <h2 className="text-[1.15rem] font-semibold leading-tight">
                        {application.title}
                    </h2>
                )}
                {application.position?.description && (
                    <div className="line-clamp-3 leading-7">
                        <PortableText
                            value={application.position.description}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <p className="mb-0">{children}</p>
                                    ),
                                },
                            }}
                        />
                    </div>
                )}

            </div>
        </article>
    );
};
