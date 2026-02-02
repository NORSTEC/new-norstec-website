"use client";

import React from "react";
import { MediaType } from "@/types/media";
import { useStripePalette } from "@/hooks/useStripePalette";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>; // kept for API parity, not used (non-clickable)
  /** Smallest stripe base width (px) at lg */
  baseWidthLg?: number;
  /** Smallest stripe base width (px) at xl */
  baseWidthXl?: number;
  /** Smallest stripe base width (px) at 3xl */
  baseWidth3xl?: number;
  /** Gap (px) between stripes at lg */
  gapLg?: number;
  /** Gap (px) between stripes at xl */
  gapXl?: number;
  /** Gap (px) between stripes at 3xl */
  gap3xl?: number;
  /** Reference height for scaling the gap with viewport height */
  referenceHeight?: number;
  className?: string;
};

// Relative widths: sky stays smallest, others ~5x larger per request
const WIDTH_FACTORS = [20, 18, 13.3, 10.05]; // sky, beachball, sun, copper
const BREAKPOINT_XL = 1280;
const BREAKPOINT_3XL = 2000; // Tailwind 3xl ≈ 125rem

export default function StripesFilter({
  selected,
  baseWidthLg = 12,
  baseWidthXl = 20,
  baseWidth3xl = 28,
  gapLg = 10,
  gapXl = 30,
  gap3xl = 22,
  referenceHeight = 900,
  className = "",
}: Props) {
  const { colors } = useStripePalette(); // [sky, beachball, sun, copper]
  const scope = React.useId().replace(/:/g, "-");
  const [{ width, height }, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const setDims = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    setDims();
    window.addEventListener("resize", setDims);
    return () => window.removeEventListener("resize", setDims);
  }, []);

  const widthsLg = WIDTH_FACTORS.map((f) => f * baseWidthLg);
  const widthsXl = WIDTH_FACTORS.map((f) => f * baseWidthXl);
  const widths3xl = WIDTH_FACTORS.map((f) => f * baseWidth3xl);

  const stripeOrder: MediaType[] = ["article", "linkedin", "instagram", "youtube"];

  const breakpoint: "lg" | "xl" | "x3" = width >= BREAKPOINT_3XL ? "x3" : width >= BREAKPOINT_XL ? "xl" : "lg";
  const baseGap = breakpoint === "x3" ? gap3xl : breakpoint === "xl" ? gapXl : gapLg;
  const resolvedGap = Math.round((height || referenceHeight) * (baseGap / referenceHeight));

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 right-0 hidden lg:flex -z-10 w-full justify-end items-stretch ${className}`}
      data-scope={scope}
      style={{ gap: `${resolvedGap}px` }}
    >
      <style jsx>{`
        [data-scope="${scope}"] .stripe-0 {
          width: ${widthsLg[0]}px;
        }
        [data-scope="${scope}"] .stripe-1 {
          width: ${widthsLg[1]}px;
        }
        [data-scope="${scope}"] .stripe-2 {
          width: ${widthsLg[2]}px;
        }
        [data-scope="${scope}"] .stripe-3 {
          width: ${widthsLg[3]}px;
        }

        @media (min-width: ${BREAKPOINT_XL}px) {
          [data-scope="${scope}"] .stripe-0 {
            width: ${widthsXl[0]}px;
          }
          [data-scope="${scope}"] .stripe-1 {
            width: ${widthsXl[1]}px;
          }
          [data-scope="${scope}"] .stripe-2 {
            width: ${widthsXl[2]}px;
          }
          [data-scope="${scope}"] .stripe-3 {
            width: ${widthsXl[3]}px;
          }
        }

        @media (min-width: ${BREAKPOINT_3XL}px) {
          [data-scope="${scope}"] .stripe-0 {
            width: ${widths3xl[0]}px;
          }
          [data-scope="${scope}"] .stripe-1 {
            width: ${widths3xl[1]}px;
          }
          [data-scope="${scope}"] .stripe-2 {
            width: ${widths3xl[2]}px;
          }
          [data-scope="${scope}"] .stripe-3 {
            width: ${widths3xl[3]}px;
          }
        }
      `}</style>

      {colors.map((color, idx) => {
        const mediaType = stripeOrder[idx];
        const isActive = selected.includes(mediaType);

        return (
          <span
            key={mediaType}
            className={`stripe-${idx} h-full`}
            style={{
              background: color,
              opacity: isActive ? 1 : 0.4,
            }}
          />
        );
      })}
    </div>
  );
}
