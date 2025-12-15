"use client";

import type { HomePage } from "@/types/pages/homePage";
import type { HomePageSection } from "@/types/pages/homePage";

import SectionTextImage from "@/components/sections/SectionTextImage";
import Hero from "@/components/static/Hero";
import SectionTable from "@/components/sections/SectionTable";
import SectionInitiatives from "@/components/sections/SectionInitiatives";
import SectionMap from "@/components/sections/SectionMap";
import NewsletterForm from "@/components/static/newsletter/NewsletterForm";

interface ClientHomePageProps {
    data: HomePage;
}

function renderHomeSection(section: HomePageSection) {
    switch (section._type) {
        case "sectionTextImage":
            return <SectionTextImage key={section._id} section={section} />;

        // case "sectionStats":
        //   return <SectionStats key={section._id} section={section} />;

        case "sectionMap":
            return <SectionMap key={section._id} section={section} />;

        case "sectionTable":
            return <SectionTable key={section._id} section={section} />;

        case "sectionInitiatives":
            return <SectionInitiatives key={section._id} section={section} />;

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
            <NewsletterForm />
            <Hero />
            <main>
                {data.sections?.map((section) => renderHomeSection(section))}
            </main>
        </>
    );
}