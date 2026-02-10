"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Tilt from "react-parallax-tilt";
import type { Image as SanityImage } from "@/types/image/image";
import type { SectionSummitSponsors } from "@/types/sections/summit/sectionSummitSponsors";
import { imageBuilder } from "@/utils/imageBuilder";

type Props = {
  section: SectionSummitSponsors;
  className?: string;
};

type LayoutSponsor = {
  key: string;
  name?: string;
  alt: string;
  link: string;
  logo: SanityImage;
  priority: number;
  colSpan: number;
  rowSpan: number;
};

function isExternalLink(link: string) {
  return /^https?:\/\//i.test(link);
}

function getTierSpans(priority: number) {
  if (priority === 1) return { colSpan: 4, rowSpan: 4 };
  if (priority === 2) return { colSpan: 4, rowSpan: 3 };
  if (priority === 3) return { colSpan: 3, rowSpan: 3 };
  return { colSpan: 2, rowSpan: 2 };
}

export default function SectionSponsors({ section, className = "" }: Props) {
  const sponsors = useMemo(() => {
    const allSponsors = section.sponsors ?? [];

    return allSponsors
      .map((sponsor, index) => ({ sponsor, index }))
      .filter(({ sponsor }) => {
        return (
          !!sponsor?.alt &&
          !!sponsor?.link &&
          !!sponsor?.logo &&
          typeof sponsor.priority === "number" &&
          Number.isFinite(sponsor.priority) &&
          sponsor.priority >= 1
        );
      })
      .sort((a, b) => a.sponsor.priority - b.sponsor.priority || a.index - b.index)
      .map(({ sponsor, index }): LayoutSponsor => ({
        key: sponsor._key || `sponsor-${index}`,
        name: sponsor.name,
        alt: sponsor.alt,
        link: sponsor.link,
        logo: sponsor.logo,
        priority: sponsor.priority,
        ...getTierSpans(sponsor.priority),
      }));
  }, [section.sponsors]);

  if (!sponsors.length) {
    return null;
  }

  return (
    <section className={`section desktop-container ${className}`}>
      <div className="flex h-full flex-col">
        {section.title && (
          <header>
            <h2 className="text-h2">
              {section.title}
              <span aria-hidden className="star-inline" />
            </h2>
          </header>
        )}

        <div className="pt-5  justify-center items-center h-full flex">
          <div
            className="grid w-full  gap-3 lg:gap-6"
            style={{
              gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
              gridAutoRows: "50px",
              gridAutoFlow: "dense",
            }}
          >
            {sponsors.map((sponsor) => {
              const logoSrc = imageBuilder(sponsor.logo, { width: 1400, fit: "max", quality: 95 });
              const ariaLabel = sponsor.name
                ? `Visit sponsor website: ${sponsor.name}`
                : `Visit sponsor website: ${sponsor.alt}`;

              const placementStyle = {
                gridColumn: `span ${sponsor.colSpan}`,
                gridRow: `span ${sponsor.rowSpan}`,
              };

              const card = (
                <Tilt
                  tiltMaxAngleX={30}
                  tiltMaxAngleY={30}
                  perspective={500}
                  transitionSpeed={2000}
                  className="h-full w-full"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-xl  hover:border-copper transition-all duration-200 p-2 md:p-3">
                    {logoSrc ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={logoSrc}
                          alt={sponsor.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <span className="text-center text-xs md:text-sm">{sponsor.name || sponsor.alt}</span>
                    )}
                  </div>
                </Tilt>
              );

              if (isExternalLink(sponsor.link)) {
                return (
                  <a
                    key={sponsor.key}
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full cursor-pointer"
                    aria-label={ariaLabel}
                    style={placementStyle}
                  >
                    {card}
                  </a>
                );
              }

              return (
                <Link
                  key={sponsor.key}
                  href={sponsor.link}
                  className="block h-full w-full cursor-pointer"
                  aria-label={ariaLabel}
                  style={placementStyle}
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
