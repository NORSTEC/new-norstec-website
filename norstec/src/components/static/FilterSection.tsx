"use client";

import ChemtrailsFilter from "@/components/items/stripes/chemtrails/ChemtrailsFilter";
import { MediaType } from "@/types/media";
import React from "react";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>;
};

export default function FilterSection({ selected, setSelected }: Props) {
  const [{ width, height }, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const setDims = () => setSize({ width: window.innerWidth, height: window.innerHeight });
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
          top: { base: 18, xl: 93, x3: 93 },
          rightFactor: { base: 0.008, xl: 0.15, x3: 0.19 },
        },
        {
          text: "instagram",
          top: { base: 32, xl: 93, x3: 93 },
          rightFactor: { base: 0.010, xl: 0.4, x3: 0.415 },
        },
        {
          text: "linkedin",
          top: { base: 48, xl: 93, x3: 93 },
          rightFactor: { base: 0.014, xl: 0.75, x3: 0.7 },
        },
        {
          text: "article",
          top: { base: 62, xl: 93, x3: 93 },
          rightFactor: { base: 0.018, xl: 1.2, x3: 1.1 },
        },
      ].map((label) => {
        const topPercent = label.top[breakpoint];
        const rightPx = height ? Math.round(height * label.rightFactor[breakpoint]) : 0;
        return { ...label, topPercent, rightPx };
      }),
    [breakpoint, height]
  );

  return (
    <section className="h-[500px] relative mobile-container no-snap ">
      <ChemtrailsFilter selected={selected} setSelected={setSelected} />
      {/* Overlay labels (non-interactive). Right offsets derive from viewport height per breakpoint. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {labelPositions.map((label) => (
          <span
            key={label.text}
            className="absolute text-3xl font-normal uppercase tracking-[0.1em] text-moody"
            style={{
              top: `${label.topPercent}%`,
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
