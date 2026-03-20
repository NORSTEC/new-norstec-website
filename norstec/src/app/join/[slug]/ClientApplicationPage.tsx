"use client";

import { PortableText } from "next-sanity";
import NextImage from "next/image";
import { imageBuilder } from "@/utils/imageBuilder";
import { ApplicationPage } from "@/types/pages/applicationPage";
import TeamCarousel from "@/components/items/team/TeamCarousel";
import type { SectionTeamMember } from "@/types/sections/sectionTeam";

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

    const contactMembers: SectionTeamMember[] = (data.contactPersons ?? []).map((person) => ({
        _key: person._id,
        member: { ...person },
    }));

    return (
        <main className="w-full">
            {imageSrc && (
                <div className="relative w-screen h-screen overflow-hidden">
                    <NextImage
                        src={imageSrc}
                        alt={data.landingImage?.alt || data.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 z-5 bg-linear-to-b from-black/90 via-black/70 to-black/20" />
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-egg-static drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)]">
                        <h1 className="text-[2rem] sm:text-[3.5rem] md:text-[4.5rem] xl:text-[7rem] 2xl:text-[9rem] font-light font-barlow uppercase">
                            {data.title}
                        </h1>
                    </div>
                </div>
            )}

            <div className="mobile-container space-y-10 max-w-5xl mx-auto">

                {!imageSrc && <h1 className="text-h1">{data.title}</h1>}

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

                {data.niceToHave?.items?.length && (
                    <div>
                        <h2 className="text-h2 mb-4">{data.niceToHave.title}</h2>
                        <ul className="space-y-2 list-disc pl-6">
                            {data.niceToHave.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {data.expectations?.items?.length && (
                    <div>
                        <h2 className="text-h2 mb-4">{data.expectations.title}</h2>
                        <ul className="space-y-2 list-disc pl-6">
                            {data.expectations.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {data.howWeWork?.content && (
                    <div className="space-y-4">
                        <h2 className="text-h2">{data.howWeWork.title}</h2>
                        <PortableText
                            value={data.howWeWork.content}
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

                {data.position && (
                    <div className="space-y-4">
                        <h2 className="text-h2">{data.position.name}</h2>
                        {data.position.description && (
                            <PortableText
                                value={data.position.description}
                                components={{
                                    block: {
                                        normal: ({ children }) => (
                                            <p className="mb-4 last:mb-0">{children}</p>
                                        ),
                                    },
                                }}
                            />
                        )}
                    </div>
                )}

                {contactMembers.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-h2">Contact</h2>
                        <TeamCarousel members={contactMembers} />
                    </div>
                )}

            </div>
        </main>
    );
}