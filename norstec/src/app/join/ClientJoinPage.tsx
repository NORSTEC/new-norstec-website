"use client";

import SectionHero from "@/components/sections/SectionHero";
import SectionTextImage from "@/components/sections/SectionTextImage";
import SectionJoin from "@/components/sections/SectionJoin";
import { JoinPage, JoinPageSection } from "@/types/pages/joinPage";
import SectionTeam from "@/components/sections/SectionTeam";

interface ClientJoinPageProps {
  data: JoinPage;
}

function renderJoinSection(section: JoinPageSection) {
  switch (section._type) {
    case "sectionHero":
      return <SectionHero key={section._id} section={section} />;
    case "sectionTextImage":
      return <SectionTextImage key={section._id} section={section} />;
    case "sectionJoin":
      return <SectionJoin key={section._id} section={section} />;
    case "sectionTeam":
      return <SectionTeam key={section._id} section={section} />;
    default:
      return null;
  }
}

export default function ClientJoinPage({ data }: ClientJoinPageProps) {
  const sections = data.sections ?? [];

  if (!sections.length) {
    return <main className="mobile-container py-16">No join content published yet.</main>;
  }

  return <main>{sections.map((section) => renderJoinSection(section))}</main>;
}
