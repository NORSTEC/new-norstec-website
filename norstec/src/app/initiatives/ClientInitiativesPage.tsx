"use client";

import type { InitiativesPage } from "@/types/pages/initiativesPage";
import SectionInitiatives from "@/components/sections/SectionInitiatives";
import VintageStripes from "@/components/items/stripes/mobile/VintageStripes";

interface ClientInitiativesPageProps {
  data: InitiativesPage;
}

function renderInitiativesSection(section: InitiativesPage["sections"][number]) {
  switch (section._type) {
    case "sectionInitiatives":
      return <SectionInitiatives key={section._id} section={section} />;
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

export default function ClientInitiativesPage({ data }: ClientInitiativesPageProps) {
  const sections = data.sections ?? [];

  if (!sections.length) {
    return <main className="mobile-container py-16">No initiatives content published yet.</main>;
  }

  return <main>{sections.map((section) => renderInitiativesSection(section))}</main>;
}
