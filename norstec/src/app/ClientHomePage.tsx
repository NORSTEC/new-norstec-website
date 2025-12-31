
"use client";

import React from "react";
import type { HomePage, HomePageSection } from "@/types/pages/homePage";

import SectionTextImage from "@/components/sections/SectionTextImage";
import SectionImage from "@/components/sections/SectionImage";
import HeroLanding from "@/components/static/HeroLanding";
import SectionTable from "@/components/sections/SectionTable";
import SectionInitiatives from "@/components/sections/SectionInitiatives";
import SectionMap from "@/components/sections/SectionMap";

interface ClientHomePageProps {
  data: HomePage;
}

function renderHomeSection(section: HomePageSection) {
  switch (section._type) {
    case "sectionTextImage":
      return <SectionTextImage key={section._id} section={section} />;

    case "sectionImage":
      return <SectionImage key={section._id} section={section} />;

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
  React.useEffect(() => {
    document.body.classList.add("snap-page");
    return () => document.body.classList.remove("snap-page");
  }, []);

  if (!data) {
    return <p>Failed to load homepage.</p>;
  }

  return (
    <>
      <HeroLanding />
      <main>{data.sections?.map((section) => renderHomeSection(section))}</main>
    </>
  );
}
