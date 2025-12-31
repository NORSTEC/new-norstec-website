"use client";

import SectionTeam from "@/components/sections/SectionTeam";
import SectionTextImage from "@/components/sections/SectionTextImage";
import { TeamPage, TeamPageSection } from "@/types/pages/teamPage";

interface ClientTeamPageProps {
  data: TeamPage;
}

function renderTeamSection(section: TeamPageSection) {
  switch (section._type) {
    case "sectionTextImage":
      return <SectionTextImage key={section._id} section={section} />;
    case "sectionTeam":
      return <SectionTeam key={section._id} section={section} />;
    default:
      return null;
  }
}

export default function ClientTeamPage({ data }: ClientTeamPageProps) {
  const sections = data.sections ?? [];

  if (!sections.length) {
    return <main className="mobile-container py-16">No team content published yet.</main>;
  }

  return <main>{sections.map((section) => renderTeamSection(section))}</main>;
}
