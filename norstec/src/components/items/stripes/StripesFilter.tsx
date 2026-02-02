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
  className?: string;
};

const WIDTH_FACTORS = [1, 2, 3, 4]; // copper, sun, beachball, sky
const BREAKPOINT_XL = 1280;
const BREAKPOINT_3XL = 2000; // Tailwind 3xl ≈ 125rem

export default function StripesFilter({
  selected,
  baseWidthLg = 12,
  baseWidthXl = 20,
  baseWidth3xl = 28,
  gapLg = 10,
  gapXl = 16,
  gap3xl = 22,
  className = "",
}: Props) {
  const { colorsReversed } = useStripePalette(); // [copper, sun, beachball, sky]
  const scope = React.useId().replace(/:/g, "-");

  const widthsLg = WIDTH_FACTORS.map((f) => f * baseWidthLg);
  const widthsXl = WIDTH_FACTORS.map((f) => f * baseWidthXl);
  const widths3xl = WIDTH_FACTORS.map((f) => f * baseWidth3xl);

  const stripeOrder: MediaType[] = ["article", "linkedin", "youtube", "instagram"];

  return (
    <div
      className={`pointer-events-none absolute inset-y-0 left-0 hidden lg:flex -z-10 ${className}`}
      data-scope={scope}
    >
      <style jsx>{`
        [data-scope="${scope}"] {
          gap: ${gapLg}px;
        }
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
          [data-scope="${scope}"] {
            gap: ${gapXl}px;
          }
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
          [data-scope="${scope}"] {
            gap: ${gap3xl}px;
          }
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

      {colorsReversed.map((color, idx) => {
        const mediaType = stripeOrder[idx];
        const isActive = selected.includes(mediaType);

        return (
          <span
            key={mediaType}
            className={`stripe-${idx} h-full rounded-xl`}
            style={{
              background: color,
              opacity: isActive ? 1 : 0.2,
            }}
          />
        );
      })}
    </div>
  );
}
