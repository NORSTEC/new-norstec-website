"use client";

import SectionHero from "@/components/sections/SectionHero";
import SectionTextImage from "@/components/sections/SectionTextImage";
import SectionFaq from "@/components/sections/SectionFaq";
import SectionEsaFundingForm from "@/components/sections/SectionEsaFundingForm";
import VintageStripes from "@/components/items/stripes/mobile/VintageStripes";
import { EsaFundingPage, EsaFundingPageSection } from "@/types/pages/esaFundingPage";

interface ClientEsaFundingPageProps {
  data: EsaFundingPage;
}

// Sections flow freely on this page (no scroll snapping), like the merch page.
const FLOW_SECTION_CLASS = "no-snap h-auto!";

function renderEsaFundingSection(section: EsaFundingPageSection) {
  switch (section._type) {
    case "sectionHero":
      return <SectionHero key={section._id} section={section} className="no-snap" />;

    case "sectionTextImage":
      return (
        <SectionTextImage key={section._id} section={section} className={FLOW_SECTION_CLASS} />
      );

    case "sectionFaq":
      return <SectionFaq key={section._id} section={section} className={FLOW_SECTION_CLASS} />;

    case "sectionEsaFundingForm":
      return (
        <SectionEsaFundingForm key={section._id} section={section} className={FLOW_SECTION_CLASS} />
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

export default function ClientEsaFundingPage({ data }: ClientEsaFundingPageProps) {
  const sections = data.sections ?? [];

  if (!sections.length) {
    return <main className="mobile-container py-16">No ESA funding content published yet.</main>;
  }

  return <main>{sections.map((section) => renderEsaFundingSection(section))}</main>;
}
