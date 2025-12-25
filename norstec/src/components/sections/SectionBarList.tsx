"use client";

import { PortableText } from "next-sanity";
import { SectionBarList as SectionBarListType } from "@/types/sections/sectionBarList";

const rowColors = [
    "bg-[var(--color-copper)]",
    "bg-[var(--color-sun)]",
    "bg-[var(--color-beachball)]",
    "bg-[var(--color-sky)]",
];

export default function SectionBarList({ section }: { section: SectionBarListType }) {
    return (
        <section className="h-screen">
            <ul className="grid grid-rows-4 h-full">
                {section.items.map((item, index) => (
                    <li
                        key={item._id}
                        className={`flex items-center text-white ${rowColors[index]} px-10 md:px-24`}
                    >
                        <article className="flex w-full items-center gap-12">
                            {/* LEFT */}
                            <div className="shrink-0">
                                <strong className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                    {item.value}
                                </strong>
                            </div>

                            {/* RIGHT */}
                            {item.caption && (
                                <div className="flex-1">
                                    <PortableText
                                        value={item.caption}
                                        components={{
                                            block: {
                                                h2: ({ children }) => (
                                                    <h3 className="text-3xl md:text-4xl mb-4 font-semibold">
                                                        {children}
                                                    </h3>
                                                ),
                                                normal: ({ children }) => (
                                                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-95">
                                                        {children}
                                                    </p>
                                                ),
                                            },
                                        }}
                                    />
                                </div>
                            )}
                        </article>
                    </li>
                ))}
            </ul>
        </section>
    );
}
