"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { PortableText } from "next-sanity";
import { motion, AnimatePresence } from "motion/react";
import type { SectionSummitProgram, SummitProgramItem } from "@/types/sections/summit/sectionSummitProgram";

type Props = {
  section: SectionSummitProgram;
  className?: string;
};

type ColumnWidths = {
  number: string;
  time: string;
  title: string;
  name: string;
};

// Column widths can be tweaked here for mobile and desktop layouts.
const COLS_MOBILE: ColumnWidths = {
  number: "2.5rem",
  time: "10rem",
  title: "minmax(0,1fr)",
  name: "8rem",
};

const COLS_DESKTOP: ColumnWidths = {
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

export default function SectionSummitProgram({ section, className = "" }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const timing = [0.24, 0.84, 0.42, 1] as const;
  const heightTransition = { type: "tween" as const, duration: 0.3, ease: timing };

  const items = useMemo(() => {
    const list = (section.items ?? []).filter((it): it is SummitProgramItem => !!it);
    return [...list].sort((a, b) => parseTime(a.startTime) - parseTime(b.startTime));
  }, [section.items]);

  if (!items.length) return null;

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const rowBase =
    "grid gap-3 items-center w-full text-left transition-colors duration-200 [grid-template-columns:var(--program-cols-mobile)] sm:[grid-template-columns:var(--program-cols-desktop)]";
  const rowGridStyle = {
    "--program-cols-mobile": `${COLS_MOBILE.number} ${COLS_MOBILE.time} ${COLS_MOBILE.title} ${COLS_MOBILE.name}`,
    "--program-cols-desktop": `${COLS_DESKTOP.number} ${COLS_DESKTOP.time} ${COLS_DESKTOP.title} ${COLS_DESKTOP.name}`,
  } as CSSProperties;

  return (
    <section className={`section desktop-container ${className}`}>
            {section.title ? (
              <h2 className="text-h2 uppercase mb-6">
                {section.title}
                <span aria-hidden className="star-inline" />
              </h2>
            ) : null}

      <div className="flex flex-col divide-y divide-moody">
        {items.map((item, idx) => {
          const isOpen = openKey === item._key;
          const hoverClasses =
            item.isBreak
              ? "bg-transparent text-moody"
              : "hover:bg-moody hover:text-egg active:bg-moody aria-expanded:bg-moody aria-expanded:text-egg [&[data-open=\"true\"]]:bg-moody [&[data-open=\"true\"]]:text-egg";
          const timeRange = [item.startTime, item.endTime].filter(Boolean).join(" - ");
          const number = idx + 1;

          return (
            <div key={item._key} className="py-1.5">
              <button
                type="button"
                onClick={() => toggle(item._key)}
                className={`${rowBase} ${hoverClasses} px-3 py-1.5 cursor-pointer rounded-md w-full`}
                data-open={isOpen}
                aria-expanded={isOpen}
                style={rowGridStyle}
              >
                <span className="flex items-center justify-center font-light text-2xl sm:text-3xl">
                  {number}.
                </span>
                <span className="relative flex items-center justify-center text-lg sm:text-xl md:text-2xl font-light pl-3">
                  <span
                    className="absolute left-0 top-[0.2px] bottom-[0.2px] w-px bg-moody"
                    aria-hidden
                  />
                  {timeRange}
                </span>
                <span className="relative flex items-center  font-light text-lg sm:text-xl md:text-2xl justify-center">
                  <span
                    className="absolute left-0 top-[0.2px] bottom-[0.2px] w-px bg-moody"
                    aria-hidden
                  />
                  {item.isBreak ? "Break" : item.title}
                </span>
                <span className="relative flex items-center h-full whitespace-nowrap pl-3 text-center justify-center">
                  <span
                    className="absolute left-0 top-[0.2px] bottom-[0.2px] w-px bg-moody"
                    aria-hidden
                  />
                  {item.isBreak ? "" : (item.name ?? "")}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && !item.isBreak && item.description?.length ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0.9 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0.9 }}
                    transition={heightTransition}
                    style={{ overflow: "hidden", transform: "translateZ(0)" }}
                  >
                    <motion.div
                      className="px-3 pt-3 pb-4 leading-6"
                      initial={{ y: -6 }}
                      animate={{ y: 0 }}
                      exit={{ y: -6 }}
                      transition={{ duration: 0.22, ease: timing }}
                    >
                      <PortableText
                        value={item.description}
                        components={{
                          block: {
                            normal: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          },
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
