"use client";

import React from "react";
import { MediaType } from "@/types/media";
import { useStripePalette } from "@/hooks/useStripePalette";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>; // parity with ChemtrailsFilter
  /** Stripe widths (px) per breakpoint: [sky(article), beachball(linkedin), sun(instagram), copper(youtube)] */
  widthsLg?: [number, number, number, number];
  widthsXl?: [number, number, number, number];
  widths3xl?: [number, number, number, number];
  /** Gap (px) between stripes per breakpoint */
  gapLg?: number;
  gapXl?: number;
  gap3xl?: number;
  className?: string;
};

const BREAKPOINT_XL = 1280;
const BREAKPOINT_3XL = 2000; // Tailwind 3xl ≈ 125rem

// Defaults: sky smallest, others larger
const DEFAULT_WIDTHS_LG: [number, number, number, number] = [60, 240, 240, 240];
const DEFAULT_WIDTHS_XL: [number, number, number, number] = [405, 277, 218.5, 180];
const DEFAULT_WIDTHS_3XL: [number, number, number, number] = [100, 360, 360, 360];

export default function StripesFilter({
  selected,
  widthsLg = DEFAULT_WIDTHS_LG,
  widthsXl = DEFAULT_WIDTHS_XL,
  widths3xl = DEFAULT_WIDTHS_3XL,
  gapLg = 10,
  gapXl = 16.3,
  gap3xl = 22,
  className = "",
}: Props) {
  const { colors } = useStripePalette(); // [sky, beachball, sun, copper]
  const [{ width }, setSize] = React.useState({ width: 0 });

  React.useEffect(() => {
    const setDims = () => setSize({ width: window.innerWidth });
    setDims();
    window.addEventListener("resize", setDims);
    return () => window.removeEventListener("resize", setDims);
  }, []);

  const stripeOrder: MediaType[] = ["article", "linkedin", "instagram", "youtube"];
  const breakpoint: "lg" | "xl" | "x3" =
    width >= BREAKPOINT_3XL ? "x3" : width >= BREAKPOINT_XL ? "xl" : "lg";

  const currentWidths =
    breakpoint === "x3" ? widths3xl : breakpoint === "xl" ? widthsXl : widthsLg;
  const currentGap = breakpoint === "x3" ? gap3xl : breakpoint === "xl" ? gapXl : gapLg;

  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden lg:flex -z-10 w-full justify-end items-stretch ${className}`}
      style={{ gap: `${currentGap}px` }}
    >
      {colors.map((color, idx) => {
        const mediaType = stripeOrder[idx];
        const isActive = selected.includes(mediaType);
        return (
          <span
            key={mediaType}
            className="h-full transition duration-150 ease-out"
            style={{
              background: color,
              width: `${currentWidths[idx]}px`,
              opacity: isActive ? 1 : 0.4,
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
