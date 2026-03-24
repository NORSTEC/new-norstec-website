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

type ListBoxItem = {
    title: string;
    items: string[];
};

function ListBox({ title, items }: ListBoxItem) {
    return (
        <div className="rounded-2xl border p-6 space-y-3">
            <h2 className="text-h2">{title}</h2>
            <ul className="space-y-2 list-disc pl-5">
                {items.map((item, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

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

    // Collect all list sections for the right column
    const listSections: ListBoxItem[] = [
        data.responsibilities?.length
            ? { title: "What You Will Do", items: data.responsibilities }
            : null,
        data.requiredQualifications?.length
            ? { title: "What We Are Looking For", items: data.requiredQualifications }
            : null,
        data.niceToHave?.items?.length
            ? { title: data.niceToHave.title, items: data.niceToHave.items }
            : null,
        data.expectations?.items?.length
            ? { title: data.expectations.title, items: data.expectations.items }
            : null,
        data.benefits?.length
            ? { title: "What You Can Expect From Us", items: data.benefits }
            : null,
    ].filter(Boolean) as ListBoxItem[];

    // Collect all description sections for the left column
    const hasDescriptions =
        data.aboutRole ||
        data.howWeWork?.content ||
        data.position;

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

            <div className="mobile-container max-w-7xl mx-auto py-12 space-y-12">

                {!imageSrc && <h1 className="text-h1">{data.title}</h1>}

                {/* Two-column layout: descriptions left, lists right */}
                {(hasDescriptions || listSections.length > 0) && (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

                        {/* Left: rich text / description sections + contact */}
                        <div className="space-y-10">
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

                            <div className="pt-4 border-egg border-2">
                                <a
                                    href="mailto:hey@norstec.no"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block rounded-full hover:bg-moody hover:text-egg  px-10 py-4 font-semibold uppercase tracking-widest transition-colors duration-200"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>

                        {listSections.length > 0 && (
                            <div className="space-y-6 lg:sticky lg:top-8">
                                {listSections.map((section) => (
                                    <ListBox
                                        key={section.title}
                                        title={section.title}
                                        items={section.items}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </main>
    );
}