"use client";

import type { HomePage } from "@/app/types/pages/homePage";
import SectionHero from "@/app/components/sections/SectionHero";
import {PortableTextBlock} from "next-sanity";
import SectionTextImage from "@/app/components/sections/SectionTextImage";


interface ClientHomePageProps {
    data: HomePage;
}

const mockIntro: PortableTextBlock[] = [
    {
        _key: "intro-block-1",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
            {
                _key: "intro-span-1",
                _type: "span",
                text:
                    "NORSTEC unites space student organizations across Norway, fostering innovation from Tromsø's sounding rockets to Trondheim's student satellites and Oslo's liquid rocket engines. ",
                marks: [],
            },
            {
                _key: "intro-span-2",
                _type: "span",
                text:
                    "We support and empower students to achieve their space exploration dreams, providing resources, networking, and opportunities for growth. Join us in advancing Norway's presence in the space industry and be part of a community dedicated to pushing the boundaries of space technology.",
                marks: [],
            },
        ],
    },
];

export default function ClientHomePage({ data }: ClientHomePageProps) {
    if (!data) {
        return <p>Failed to load homepage.</p>;
    }
    return (
        <>
            <SectionHero />
            <main>
                <SectionTextImage title={"Nerds, Students, and Engineers"} body={mockIntro} />
            </main>
        </>
    );
}
