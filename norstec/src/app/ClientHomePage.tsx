"use client";

import React from "react";
import type { HomePage, HomePageSection } from "@/types/pages/homePage";
import SectionTextImage from "@/components/sections/SectionTextImage";
import SectionImage from "@/components/sections/SectionImage";
import HeroLanding from "@/components/static/HeroLanding";
import SectionTable from "@/components/sections/SectionTable";
import SectionInitiatives from "@/components/sections/SectionInitiatives";
import SectionMap from "@/components/sections/SectionMap";
import VintageStripes from "@/components/items/stripes/mobile/VintageStripes";
import "../styles/globals.css"
import Mountain from "@/components/sections/Mountain";

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
    case "sectionDivider": {
      const lineFactor = 200 - section.lineDensity * 10;

      return (
          <VintageStripes
              key={section._id}
              color={section.color}
              lineFactor={lineFactor}
          />
      );
    }

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
        <HeroLanding/>
        <main>
          {data.sections?.map((section) => (
              <React.Fragment key={section._id}>
                {renderHomeSection(section)}
              </React.Fragment>
          ))}
        </main>

      </>
  );
}
