"use client";

import ChemtrailsFilter from "@/components/items/stripes/chemtrails/ChemtrailsFilter";
import { MediaType } from "@/types/media";
import React from "react";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>;
};

export default function FilterSection({ selected, setSelected }: Props) {
  const [{ width }, setSize] = React.useState({ width: 0 });

  React.useEffect(() => {
    const setDims = () => setSize({ width: window.innerWidth });
    setDims();
    window.addEventListener("resize", setDims);
    return () => window.removeEventListener("resize", setDims);
  }, []);

  const breakpoint = React.useMemo<"base" | "xl" | "x3">(() => {
    if (width >= 2000) return "x3";
    if (width >= 1280) return "xl";
    return "base";
  }, [width]);

  const labelPositions = React.useMemo(
    () =>
      [
        {
          text: "youtube",
          topPx: { base: 90, xl: 450, x3: 430 },
          rightPx: { base: 8, xl: 130, x3: 120 },
        },
        {
          text: "instagram",
          topPx: { base: 160, xl: 450, x3: 430 },
          rightPx: { base: 23, xl: 320, x3: 300 },
        },
        {
          text: "linkedin",
          topPx: { base: 240, xl: 450, x3: 430 },
          rightPx: { base: 43, xl: 555, x3: 520 },
        },
        {
          text: "article",
          topPx: { base: 320, xl: 450, x3: 430 },
          rightPx: { base: 68, xl: 850, x3: 820 },
        },
      ].map((label) => ({
        text: label.text,
        topPx: label.topPx[breakpoint],
        rightPx: label.rightPx[breakpoint],
      })),
    [breakpoint]
  );

  return (
    <section className="h-[500px] hidden xl:block relative mobile-container no-snap ">
      <ChemtrailsFilter selected={selected} setSelected={setSelected} />
      {/* Overlay labels (non-interactive). Right offsets derive from viewport height per breakpoint. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {labelPositions.map((label) => (
          <span
            key={label.text}
            className="absolute text-3xl font-normal uppercase tracking-[0.1em] text-moody"
            style={{
              top: `${label.topPx}px`,
              right: `${label.rightPx}px`,
            }}
          >
            {label.text}
          </span>
        ))}
      </div>
    </section>
  );
}
