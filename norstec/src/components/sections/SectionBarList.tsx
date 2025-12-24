"use client";

import { PortableText } from "next-sanity";
import { SectionBarList as SectionBarListType } from "@/types/sections/sectionBarList";

export default function SectionBarList({ section }: { section: SectionBarListType }) {
    console.log("SECTION BAR LIST FULL:", section);
    console.log("SECTION BAR LIST ITEMS:", section.items);
    return (
        <section>
            {section.title && <h2>{section.title}</h2>}

            <ul>
                {section.items.map((item) => (
                    <li key={item._id}>
                        <strong>{item.value}</strong>

                        {item.caption && (
                            <PortableText value={item.caption} />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
