"use client";

import {AboutPage, AboutPageSection} from "@/types/pages/aboutPage";
import SectionHero from "@/components/sections/SectionHero";
import SectionTextImage from "@/components/sections/SectionTextImage";
import SectionBarList from "@/components/sections/SectionBarList";
import SectionStats from "@/components/sections/SectionStats";
import SectionTable from "@/components/sections/SectionTable";

interface AboutPageProps {
    data: AboutPage;
}

function renderAboutSection(section: AboutPageSection) {
    switch (section._type) {
        case "sectionHero":
            return <SectionHero key={section._id} section={section} />;

        case "sectionTextImage":
            return <SectionTextImage key={section._id} section={section} />;

        case "sectionBarList":
            return <SectionBarList key={section._id} section={section} />;

        case "sectionStats":
            return <SectionStats key={section._id} section={section} />;

        case "sectionTable":
            return <SectionTable key={section._id} section={section} />;

        default:
            return null;
    }
}

export default function ClientAboutPage({ data }: AboutPageProps) {
    return (
        <main>
            {data.sections.map((section) => renderAboutSection(section))}
        </main>
    );
}
