"use client";

import { PortableText } from "next-sanity";
import NextImage from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import { ApplicationPage } from "@/types/pages/applicationPage";

type Props = {
    data: ApplicationPage;
};

export default function ClientApplicationPage({ data }: Props) {
    const imageSrc = data.landingImage
        ? imageBuilder(data.landingImage, {
            width: 1600,
            height: 900,
            quality: 90,
            fit: "crop",
        })
        : null;

    return (
        <main className="section height-auto! w-full">
            <section className="mobile-container py-20 space-y-10 max-w-5xl mx-auto">

                {/* Title */}
                <h1 className="text-h1">{data.title}</h1>

                {/* Image */}
                {imageSrc && (
                    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                        <NextImage
                            src={imageSrc}
                            alt={data.landingImage?.alt || data.title}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                )}

                {/* About Role */}
                {data.aboutRole && (
                    <div className="space-y-4">
                        <h2 className="text-h2">About the Role</h2>
                        <PortableText
                            value={data.aboutRole}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <p className="mb-4 last:mb-0">{children}</p>
                                    ),
                                },
                            }}
                        />
                    </div>
                )}

                {/* Responsibilities */}
                {data.responsibilities?.length && (
                    <div>
                        <h2 className="text-h2 mb-4">What You Will Do</h2>
                        <ul className="space-y-2 list-disc pl-6">
                            {data.responsibilities.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Qualifications */}
                {data.requiredQualifications?.length && (
                    <div>
                        <h2 className="text-h2 mb-4">What We Are Looking For</h2>
                        <ul className="space-y-2 list-disc pl-6">
                            {data.requiredQualifications.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Benefits */}
                {data.benefits?.length && (
                    <div>
                        <h2 className="text-h2 mb-4">What You Can Expect From Us</h2>
                        <ul className="space-y-2 list-disc pl-6">
                            {data.benefits.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </main>
    );
}
