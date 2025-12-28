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
import { InitiativePage, InitiativePageSection } from "@/types/pages/initiativePage";

function renderInitiativeSection(section: InitiativePageSection) {
  switch (section._type) {
    case "sectionHero":
      return <SectionHero key={section._id} section={section} />;
    case "sectionTextImage":
      return <SectionTextImage key={section._id} section={section} />;
    case "sectionBarList":
      return <SectionBarList key={section._id} section={section} />;
    case "sectionTable":
      return <SectionTable key={section._id} section={section} />;
    case "sectionStats":
      return <SectionStats key={section._id} section={section} />;
    case "sectionImage":
      return <SectionImage key={section._id} section={section} />;
    case "sectionQuote":
      return <SectionQuote key={section._id} section={section} />;
    case "sectionFaq":
      return <SectionFaq key={section._id} section={section} />;
    case "sectionPodcast":
      return <SectionPodcast key={section._id} section={section} />;
    default:
      return null;
  }
}

export default function ClientInitiativePage({ initiative }: { initiative: InitiativePage }) {
  const sections = initiative.sections ?? [];

  if (!sections.length) {
    return (
      <main className="mobile-container py-16">No content published for this initiative yet.</main>
    );
  }

  return <main>{sections.map((section) => renderInitiativeSection(section))}</main>;
}
