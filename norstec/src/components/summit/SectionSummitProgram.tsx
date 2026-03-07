"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import NextImage from "next/image";
import { PortableText } from "next-sanity";
import { motion, AnimatePresence } from "motion/react";
import type {
  SectionSummitProgram,
  SummitProgramItem,
  SummitProgramItemImage,
} from "@/types/sections/summit/sectionSummitProgram";
import { imageBuilder } from "@/utils/imageBuilder";

/* ---------- types ---------- */

type Props = {
  section: SectionSummitProgram;
  className?: string;
};

type CompactColumns = {
  number: string;
  time: string;
  title: string;
};

type FullColumns = CompactColumns & {
  name: string;
};

/* ---------- constants ---------- */

const COLS_BASE: CompactColumns = {
  number: "0.5rem",
  time: "6.5rem",
  title: "minmax(0,1fr)",
};

const COLS_MD: CompactColumns = {
  number: "2.75rem",
  time: "10.5rem",
  title: "minmax(0,1fr)",
};

const COLS_FULL: FullColumns = {
  number: "3rem",
  time: "10.5rem",
  title: "minmax(0,1fr)",
  name: "25rem",
};

function parseTime(value: string) {
  const [h, m] = (value ?? "").split(":").map((v) => parseInt(v, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) return Number.POSITIVE_INFINITY;
  return h * 60 + m;
}

function ProgramHeroStarCluster({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  const directionClass = isLeft ? "flex-row" : "flex-row-reverse";
  const edgeClipClass = isLeft ? "-translate-x-[52%]" : "translate-x-[52%]";

  return (
    <div className={`flex items-end gap-2 md:gap-16 ${directionClass}`}>
      <span
        aria-hidden
        className={`star-inline ml-0 shrink-0 scale-[4] origin-center ${edgeClipClass}`}
      />
      <span aria-hidden className="star-inline ml-0 shrink-0 scale-[3] origin-center" />
      <span aria-hidden className="star-inline ml-0 shrink-0 scale-[2.5] origin-center" />
      <span aria-hidden className="star-inline ml-0 shrink-0 scale-[2] origin-center" />
    </div>
  );
}

export default function SectionSummitProgram({
                                               section,
                                               className = "",
                                             }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const timing = [0.24, 0.84, 0.42, 1] as const;
  const heightTransition = {
    type: "tween" as const,
    duration: 0.3,
    ease: timing,
  };

  const items = useMemo(() => {
    const list = (section.items ?? []).filter(
        (it): it is SummitProgramItem => !!it
    );
    return [...list].sort(
        (a, b) => parseTime(a.startTime) - parseTime(b.startTime)
    );
  }, [section.items]);

  if (!items.length) return null;

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const rowBase =
      "grid gap-3 items-center w-full text-left transition-colors duration-200 " +
      "[grid-template-columns:var(--program-cols-base)] " +
      "md:[grid-template-columns:var(--program-cols-md)] " +
      "xl:[grid-template-columns:var(--program-cols-full)]";

  const rowGridStyle = {
    "--program-cols-base": `${COLS_BASE.number} ${COLS_BASE.time} ${COLS_BASE.title}`,
    "--program-cols-md": `${COLS_MD.number} ${COLS_MD.time} ${COLS_MD.title}`,
    "--program-cols-full": `${COLS_FULL.number} ${COLS_FULL.time} ${COLS_FULL.title} ${COLS_FULL.name}`,
  } as CSSProperties;

  const getItemImages = (item: SummitProgramItem): SummitProgramItemImage[] => {
    const candidates = item.images?.length ? item.images : item.speakerlogos ?? [];
    return candidates.filter((entry): entry is SummitProgramItemImage => Boolean(entry?.image)).slice(0, 2);
  };

  return (
    <section className={`section no-snap h-auto! ${className}`}>
      {section.title ? (
        <div className="mb-6">
          <div className="relative overflow-hidden min-h-[20rem] md:min-h-[30rem] flex flex-col justify-center">
            <h2 className="text-center uppercase font-light tracking-[0.15em] text-[clamp(3.8rem,10vw,12rem)]">
              {section.title}
            </h2>

            <div className="mt-8 md:mt-12 flex items-end justify-between">
              <ProgramHeroStarCluster side="left" />
              <ProgramHeroStarCluster side="right" />
            </div>
          </div>
        </div>
      ) : null}

      <div className="desktop-container pt-0!">
        {section.subtitle ? <p className="mt-2 text-moody text-base">{section.subtitle}</p> : null}

        <div className="flex flex-col divide-y divide-moody">
          {items.map((item, idx) => {
            const isOpen = openKey === item._key;
            const itemImages = getItemImages(item);

            const hoverClasses = item.isBreak
              ? "bg-transparent text-moody"
              : "hover:bg-moody hover:text-egg active:bg-moody " +
                "aria-expanded:bg-moody aria-expanded:text-egg " +
                '[&[data-open="true"]]:bg-moody [&[data-open="true"]]:text-egg';

            const timeRange = [item.startTime, item.endTime].filter(Boolean).join(" - ");

            return (
              <div key={item._key} className="py-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (!item.isBreak) toggle(item._key);
                  }}
                  className={`${rowBase} ${hoverClasses} pl-2 pr-1 md:px-3 py-1.5 ${
                    item.isBreak ? "" : "cursor-pointer"
                  } rounded-md w-full`}
                  data-open={isOpen}
                  aria-expanded={isOpen}
                  style={rowGridStyle}
                >
                  <span className="flex items-center justify-center font-light text-xl md:text-3xl">
                    {idx + 1}.
                  </span>

                  <span className="relative flex items-center justify-center text-base md:text-2xl font-light pl-3 h-full">
                    <span
                      className="absolute left-0 top-[0.2px] bottom-[0.2px] w-px bg-moody"
                      aria-hidden
                    />
                    {timeRange}
                  </span>

                  <span className="relative flex items-center font-light text-base md:text-2xl xl:justify-center pl-3">
                    <span
                      className="absolute left-0 top-[0.2px] bottom-[0.2px] w-px bg-moody"
                      aria-hidden
                    />
                    {item.isBreak ? "Break" : item.title}
                  </span>

                  <span className="relative hidden xl:flex items-center h-full whitespace-nowrap pl-3 justify-center">
                    <span
                      className="absolute left-0 top-[0.2px] bottom-[0.2px] w-px bg-moody"
                      aria-hidden
                    />
                    {item.isBreak ? "" : (item.name ?? "")}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen &&
                  !item.isBreak &&
                  (item.description?.length || item.name || itemImages.length) ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0.9 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0.9 }}
                      transition={heightTransition}
                      style={{ overflow: "hidden" }}
                    >
                      <motion.div
                        className="px-3 pt-3 pb-4 leading-6"
                        initial={{ y: -6 }}
                        animate={{ y: 0 }}
                        exit={{ y: -6 }}
                        transition={{ duration: 0.22, ease: timing }}
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                          <div className="order-1 lg:order-2 min-w-0 lg:flex-1">
                            {item.name ? (
                              <p className="mb-2 text-sm xl:hidden font-semibold">{item.name}</p>
                            ) : null}

                            <PortableText
                              value={item.description ?? []}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <p className="mb-2 last:mb-0 text-sm md:text-base">
                                      {children}
                                    </p>
                                  ),
                                },
                              }}
                            />
                          </div>

                          {itemImages.length ? (
                            <div
                              className={`order-2 lg:order-1 grid gap-3 w-full lg:w-[18rem] lg:flex-none ${
                                itemImages.length > 1 ? "grid-cols-2" : "grid-cols-1"
                              }`}
                            >
                              {itemImages.map((entry, imageIndex) => {
                                const src = imageBuilder(
                                  entry.image as SummitProgramItemImage["image"],
                                  {
                                    width: 700,
                                    height: 980,
                                    fit: "crop",
                                    quality: 90,
                                  }
                                );

                                if (!src) {
                                  return null;
                                }

                                return (
                                  <div
                                    key={entry._key ?? `${item._key}-image-${imageIndex}`}
                                    className="relative w-full aspect-[3/4] overflow-hidden rounded-md bg-moody/10"
                                  >
                                    <NextImage
                                      src={src}
                                      alt={entry.alt || item.title || "Program image"}
                                      fill
                                      className="object-cover"
                                      sizes={
                                        itemImages.length > 1
                                          ? "(min-width: 1024px) 9rem, 50vw"
                                          : "(min-width: 1024px) 18rem, 100vw"
                                      }
                                      unoptimized
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
