"use client";

import SectionHero from "@/components/sections/SectionHero";
import SectionTextImage from "@/components/sections/SectionTextImage";
import SectionBarList from "@/components/sections/SectionBarList";
import SectionTable from "@/components/sections/SectionTable";
import SectionStats from "@/components/sections/SectionStats";
import SectionImage from "@/components/sections/SectionImage";
import SectionQuote from "@/components/sections/SectionQuote";
import SectionFaq from "@/components/sections/SectionFaq";
import SectionPodcast from "@/components/sections/SectionPodcast";
import SectionTeam from "@/components/sections/SectionTeam";
import SectionSummitTextImage from "@/components/summit/SectionSummitTextImage";
import SectionSummitTimer from "@/components/summit/SectionSummitTimer";
import SectionSummitHost from "@/components/summit/SectionSummitHost";
import SectionSummitInfo from "@/components/summit/SectionSummitInfo";
import SectionSummitProgram from "@/components/summit/SectionSummitProgram";
import SectionBusinessContact from "@/components/summit/SectionBusinessContact";
import SectionInitiativeAdditionalPage from "@/components/summit/SectionInitiativeAdditionalPage";
import VintageStripes from "@/components/items/stripes/mobile/VintageStripes";


import {
    StripePaletteName,
    StripePaletteProvider,
} from "@/hooks/useStripePalette";
import {InitiativeSubPage, InitiativeSubPageSection} from "@/types/pages/initiativesSubPage";

function renderInitiativeSubPageSection(
    section: InitiativeSubPageSection,
    className?: string
) {
    switch (section._type) {
        case "sectionHero":
            return <SectionHero key={section._id} section={section} className={className} />;
        case "sectionTextImage":
            return <SectionTextImage key={section._id} section={section} className={className} />;
        case "sectionBarList":
            return <SectionBarList key={section._id} section={section} className={className} />;
        case "sectionTable":
            return <SectionTable key={section._id} section={section} className={className} />;
        case "sectionStats":
            return <SectionStats key={section._id} section={section} className={className} />;
        case "sectionImage":
            return <SectionImage key={section._id} section={section} className={className} />;
        case "sectionQuote":
            return <SectionQuote key={section._id} section={section} className={className} />;
        case "sectionFaq":
            return <SectionFaq key={section._id} section={section} className={className} />;
        case "sectionPodcast":
            return <SectionPodcast key={section._id} section={section} className={className} />;
        case "sectionTeam":
            return <SectionTeam key={section._id} section={section} className={className} />;
        case "sectionSummitTextImage":
            return (
                <SectionSummitTextImage
                    key={section._id}
                    section={section}
                    className={className}
                />
            );
        case "sectionSummitTimer":
            return <SectionSummitTimer key={section._id} section={section} className={className} />;
        case "sectionSummitHost":
            return <SectionSummitHost key={section._id} section={section} className={className} />;
        case "sectionSummitInfo":
            return <SectionSummitInfo key={section._id} section={section} className={className} />;
        case "sectionSummitProgram":
            return <SectionSummitProgram key={section._id} section={section} className={className} />;
        case "sectionBusinessContact":
            return (
                <SectionBusinessContact
                    key={section._id}
                    section={section}
                    className={className}
                />
            );
        case "sectionInitiativeAdditionalPage":
        case "initiativePage":
            return (
                <SectionInitiativeAdditionalPage
                    key={section._id}
                    section={section}
                    className={className}
                />
            );
        case "sectionDivider": {
            const lineFactor = 200 - section.lineDensity * 10;
            return (
                <VintageStripes
                    key={section._id}
                    color={section.color}
                    lineFactor={lineFactor}
                    paddingTop={section.paddingTop}
                    paddingBottom={section.paddingBottom}
                />
            );
        }
        default:
            return null;
    }
}

export default function ClientInitiativeSubPage({
                                                    page,
                                                    sectionClassName,
                                                    stripePalette = "default",
                                                }: {
    page: InitiativeSubPage;
    sectionClassName?: string;
    stripePalette?: StripePaletteName;
}) {
    const sections = page.sections ?? [];

    if (!sections.length) {
        return (
            <main className="mobile-container py-16">
                No content published for this page yet.
            </main>
        );
    }

    return (
        <StripePaletteProvider palette={stripePalette}>
            <main>
                {sections.map((section) =>
                    renderInitiativeSubPageSection(section, sectionClassName)
                )}
            </main>
        </StripePaletteProvider>
    );
}
