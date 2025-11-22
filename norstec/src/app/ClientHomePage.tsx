"use client";

import type { HomePage } from "@/app/types/pages/homePage";
import type { HomePageSection } from "@/app/types/pages/homePage";

import SectionTextImage from "@/app/components/sections/SectionTextImage";
import SectionHero from "@/app/components/sections/SectionHero";
import SectionTable from "@/app/components/sections/SectionTable";

interface ClientHomePageProps {
    data: HomePage;
}

function renderHomeSection(section: HomePageSection) {
    switch (section._type) {
        case "sectionTextImage":
            return <SectionTextImage key={section._id} section={section} />;

        // case "sectionStats":
        //   return <SectionStats key={section._id} section={section} />;

        // case "sectionMap":
        //   return <SectionMap key={section._id} section={section} />;

        case "sectionTable":
            return <SectionTable key={section._id} section={section} />;

        // case "sectionInitiatives":
        //   return <SectionInitiatives key={section._id} section={section} />;

        default:
            return null;
    }
}

export default function ClientHomePage({ data }: ClientHomePageProps) {
    if (!data) {
        return <p>Failed to load homepage.</p>;
    }

    return (
        <>
            <SectionHero />
            <main>
                {data.sections?.map((section) => renderHomeSection(section))}
            </main>
        </>
    );
}