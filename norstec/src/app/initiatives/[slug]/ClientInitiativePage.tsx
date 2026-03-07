"use client";

import Link from "next/link";
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
import SectionSponsors from "@/components/summit/SectionSponsors";
import SectionBusinessContact from "@/components/summit/SectionBusinessContact";
import SectionInitiativeAdditionalPage from "@/components/summit/SectionInitiativeAdditionalPage";
import VintageStripes from "@/components/items/stripes/mobile/VintageStripes";
import { InitiativePage, InitiativePageSection } from "@/types/pages/initiativePage";
import { StripePaletteName, StripePaletteProvider } from "@/hooks/useStripePalette";

function renderProgramLinkSection({
  key,
  title,
  href,
  label,
  className,
}: {
  key: string;
  title?: string;
  href: string;
  label: string;
  className?: string;
}) {
  const desktopRowsPerColumn = 7;
  const desktopColumns = 2;
  const desktopTotalRows = desktopRowsPerColumn * desktopColumns;
  const mobileRows = 7;

  const word = (title?.trim() || "Program").toUpperCase();
  const desktopItems = Array.from({ length: desktopTotalRows }, (_, index) => index);
  const mobileItems = Array.from({ length: mobileRows }, (_, index) => index);
  const ariaLabel = label || "View Program";

  return (
    <section key={key} className={`section  ${className ?? ""}`}>
      <div className="h-full flex items-center justify-center">
        <div className="xl:hidden flex flex-col mobile-container">
          {mobileItems.map((index) => (
            <Link
              key={`mobile-${index}`}
              href={href}
              aria-label={ariaLabel}
              className="group inline-flex w-full items-center gap-2 justify-center  italic uppercase leading-[1.4] text-[clamp(2rem,11vw,3.1rem)] tracking-[4vw] "
            >
              {word}
              <span
                aria-hidden
                className="icon icon-48 transition-all duration-150 group-hover:opacity-100"
              >
                trending_flat
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden xl:grid md:grid-cols-2  h-full desktop-container gap-5">
          {Array.from({ length: desktopColumns }, (_, columnIndex) => (
            <div
              key={`column-${columnIndex}`}
              className="flex h-full flex-col justify-between items-center"
            >
              {desktopItems
                .slice(columnIndex * desktopRowsPerColumn, (columnIndex + 1) * desktopRowsPerColumn)
                .map((index) => (
                  <Link
                    key={`desktop-${index}`}
                    href={href}
                    aria-label={ariaLabel}
                    className="group inline-flex items-center font-normal uppercase leading-[1.05] py-0.5 text-[clamp(2rem,5vw,5rem)] tracking-[0.4em]"
                  >
                    <span className=" group-hover:italic group-hover:font-extralight">{word}</span>
                    <span
                      aria-hidden
                      className="icon [--ms-optical-size:64] text-[64px] opacity-0 transition-all duration-150 group-hover:opacity-100"
                    >
                      trending_flat
                    </span>
                  </Link>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderInitiativeSection(
  section: InitiativePageSection,
  className?: string,
  summitProgramHref?: string,
  summitProgramLabel?: string
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
        <SectionSummitTextImage key={section._id} section={section} className={className} />
      );
    case "sectionSummitTimer":
      return <SectionSummitTimer key={section._id} section={section} className={className} />;
    case "sectionSummitHost":
      return <SectionSummitHost key={section._id} section={section} className={className} />;
    case "sectionSummitInfo":
      return <SectionSummitInfo key={section._id} section={section} className={className} />;
    case "sectionSummitProgram":
      if (summitProgramHref) {
        return renderProgramLinkSection({
          key: section._id,
          title: section.title,
          href: summitProgramHref,
          label: summitProgramLabel ?? "View Program",
          className,
        });
      }
      return <SectionSummitProgram key={section._id} section={section} className={className} />;
    case "sectionSummitSponsors":
      return <SectionSponsors key={section._id} section={section} className={className} />;
    case "sectionBusinessContact":
      return <SectionBusinessContact key={section._id} section={section} className={className} />;
    case "sectionInitiativeAdditionalPage":
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

export default function ClientInitiativePage({
  initiative,
  sectionClassName,
  stripePalette = "default",
  summitProgramHref,
  summitProgramLabel,
}: {
  initiative: InitiativePage;
  sectionClassName?: string;
  stripePalette?: StripePaletteName;
  summitProgramHref?: string;
  summitProgramLabel?: string;
}) {
  const sections = initiative.sections ?? [];

  if (!sections.length) {
    return (
      <main className="mobile-container py-16">No content published for this initiative yet.</main>
    );
  }

  return (
    <StripePaletteProvider palette={stripePalette}>
      <main>
        {sections.map((section) =>
          renderInitiativeSection(
            section,
            sectionClassName,
            summitProgramHref,
            summitProgramLabel
          )
        )}
      </main>
    </StripePaletteProvider>
  );
}
