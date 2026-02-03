"use client";

import SectionHero from "@/components/sections/SectionHero";
import SectionTextImage from "@/components/sections/SectionTextImage";
import SectionBarList from "@/components/sections/SectionBarList";
import SectionTable from "@/components/sections/SectionTable";
import SectionStats from "@/components/sections/SectionStats";
import SectionImage from "@/components/sections/SectionImage";
import SectionQuote from "@/components/sections/SectionQuote";
import SectionFaq from "@/components/sections/SectionFaq";
import SectionTeam from "@/components/sections/SectionTeam";
import SectionMedia from "@/components/sections/SectionMedia";
import VintageStripes from "@/components/items/stripes/mobile/VintageStripes";
import { ArticleDetailPage } from "@/types/pages/articlePage";
import { ArticleSection } from "@/types/sections/articleSection";

function renderArticleSection(section: ArticleSection, className?: string) {
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
    case "sectionTeam":
      return <SectionTeam key={section._id} section={section} className={className} />;
    case "sectionMedia":
      return <SectionMedia key={section._id} section={section} className={className} />;
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

export default function ClientArticlePage({
  article,
  sectionClassName,
}: {
  article: ArticleDetailPage;
  sectionClassName?: string;
}) {
  const sections = article.sections ?? [];

  if (!sections.length) {
    return <main className="mobile-container py-16">No content published for this article yet.</main>;
  }

  return <main>{sections.map((section) => renderArticleSection(section, sectionClassName))}</main>;
}
