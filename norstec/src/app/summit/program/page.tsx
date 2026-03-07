import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInitiativeBySlug } from "@/sanity/fetch/SanityFetch";
import type { InitiativePageSection } from "@/types/pages/initiativePage";
import type { SectionSummitProgram as SectionSummitProgramType } from "@/types/sections/summit/sectionSummitProgram";
import ClientSummitProgramPage from "./ClientSummitProgramPage";

const SUMMIT_SLUG = "summit";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Program | SUMMIT",
  description: "Program for the NORSTEC Summit.",
};

function isSummitProgramSection(
  section: InitiativePageSection
): section is SectionSummitProgramType {
  return section._type === "sectionSummitProgram";
}

export default async function SummitProgramPage() {
  const initiative = await getInitiativeBySlug(SUMMIT_SLUG);

  if (!initiative) {
    notFound();
  }

  const programSection = (initiative.sections ?? []).find(isSummitProgramSection);

  if (!programSection) {
    return <main className="mobile-container py-16">No program published yet.</main>;
  }

  return <ClientSummitProgramPage section={programSection} />;
}
