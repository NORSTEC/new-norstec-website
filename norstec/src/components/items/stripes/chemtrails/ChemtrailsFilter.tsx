"use client";

import React from "react";
import { MediaType } from "@/types/media";
import { useStripePalette } from "@/hooks/useStripePalette";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>;
};

type StripeConfig = {
  mediaType: MediaType;
  trapClassName: string;
  wrapperClassName: string;
  wrapperStyle: React.CSSProperties;
  zIndex: number;
};

const STRIPE_CLIP_PATH = "polygon(var(--trap-cut) 0%, 100% 0%, 100% 100%, 0% 100%)";

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const STRIPE_CONFIGS: StripeConfig[] = [
  {
    mediaType: "youtube",
    trapClassName:
      "[--trap-width:262px] [--trap-cut:230px] xl:[--trap-width:280px] xl:[--trap-cut:150px] 3xl:[--trap-width:370px] 3xl:[--trap-cut:150px]",
    wrapperClassName: "absolute top-0 right-0 h-full [--rot:0deg]",
    wrapperStyle: {
      transform: "translate(0px, 0px) rotate(var(--rot))",
      transformOrigin: "top right",
    },
    zIndex: 40,
  },
  {
    mediaType: "instagram",
    trapClassName:
      "[--trap-width:490px] [--trap-cut:458px] xl:[--trap-width:380px] xl:[--trap-cut:250px] 3xl:[--trap-width:540px] 3xl:[--trap-cut:390px]",
    wrapperClassName:
      "absolute top-0 right-0 h-full [--rot:5deg] xl:[--rot:6deg] 3xl:[--rot:6deg] [--x:-3.3rem] xl:[--x:-9rem] 3xl:[--x:-15rem]",
    wrapperStyle: {
      transform: "translateX(var(--x)) rotate(var(--rot))",
      transformOrigin: "top right",
    },
    zIndex: 30,
  },
  {
    mediaType: "linkedin",
    trapClassName:
      "[--trap-width:498px] [--trap-cut:468px] xl:[--trap-width:480px] xl:[--trap-cut:350px] 3xl:[--trap-width:630px] 3xl:[--trap-cut:510px]",
    wrapperClassName:
      "absolute top-0 right-0 h-full [--rot:14deg] xl:[--rot:15.1deg] 3xl:[--rot:20.8deg] [--x:-6rem] xl:[--x:-18.5rem] 3xl:[--x:-26rem]",
    wrapperStyle: {
      transform: "translateX(var(--x)) rotate(var(--rot))",
      transformOrigin: "top right",
    },
    zIndex: 20,
  },
  {
    mediaType: "article",
    trapClassName:
      "[--trap-width:500px] [--trap-cut:473px] xl:[--trap-width:580px] xl:[--trap-cut:450px] 3xl:[--trap-width:720px] 3xl:[--trap-cut:630px]",
    wrapperClassName:
      "absolute top-0 right-0 h-full [--rot:23deg] xl:[--rot:28.2deg] 3xl:[--rot:39.2deg] [--x:-rem] xl:[--x:-28.5rem] 3xl:[--x:-37rem]",
    wrapperStyle: {
      transform: "translateX(var(--x)) rotate(var(--rot))",
      transformOrigin: "top right",
    },
    zIndex: 10,
  },
];

export default function ChemtrailsFilter({ selected, setSelected }: Props) {
  const { colorsReversed } = useStripePalette();

  const handleToggle = (mediaType: MediaType) => {
    setSelected((prev) =>
      prev.includes(mediaType)
        ? prev.filter((type) => type !== mediaType)
        : [...prev, mediaType]
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden hidden lg:block">
      <div className="relative h-full w-full -translate-x-[3rem] lg:-translate-x-[5rem] xl:-translate-x-[7rem] 3xl:-translate-x-[15rem]">
        {STRIPE_CONFIGS.map((stripe, index) => {
          const color = colorsReversed[index];
          const isActive = selected.includes(stripe.mediaType);
          const inactiveBg = hexToRgba(color, 0.4);

          return (
            <button
              key={stripe.mediaType}
              type="button"
              aria-pressed={isActive}
              aria-label={`Toggle ${stripe.mediaType}`}
              title={`Toggle ${stripe.mediaType}`}
              onClick={() => handleToggle(stripe.mediaType)}
              className={`block cursor-pointer select-none transition duration-150 ease-out ${stripe.wrapperClassName} ${stripe.trapClassName} focus:outline-none focus-visible:ring-2 focus-visible:ring-egg/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
              style={{
                ...stripe.wrapperStyle,
                zIndex: stripe.zIndex,
                width: "var(--trap-width)",
                height: "300%",
                background: isActive ? color : inactiveBg,
                border: "none",
                clipPath: STRIPE_CLIP_PATH,
                WebkitClipPath: STRIPE_CLIP_PATH,
                opacity: 1,
                filter: "saturate(1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
