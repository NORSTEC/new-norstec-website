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

const STRIPE_CONFIGS: StripeConfig[] = [
  {
    mediaType: "youtube",
    trapClassName:
      "[--trap-width:262px] [--trap-cut:230px] xl:[--trap-width:510px] xl:[--trap-cut:474px] 3xl:[--trap-width:600px] 3xl:[--trap-cut:560px]",
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
      "[--trap-width:490px] [--trap-cut:458px] xl:[--trap-width:644px] xl:[--trap-cut:610px] 3xl:[--trap-width:743px] 3xl:[--trap-cut:704px]",
    wrapperClassName:
      "absolute top-0 right-0 h-full [--rot:5deg] xl:[--rot:11deg] 3xl:[--rot:10deg] [--x:-3rem] xl:[--x:-3.55rem] 3xl:[--x:-4.45rem]",
    wrapperStyle: {
      transform: "translateX(var(--x)) rotate(var(--rot))",
      transformOrigin: "top right",
    },
    zIndex: 30,
  },
  {
    mediaType: "linkedin",
    trapClassName:
      "[--trap-width:498px] [--trap-cut:468px] xl:[--trap-width:661px] xl:[--trap-cut:632px] 3xl:[--trap-width:751px] 3xl:[--trap-cut:717px]",
    wrapperClassName:
      "absolute top-0 right-0 h-full [--rot:14deg] xl:[--rot:25deg] 3xl:[--rot:22deg] [--x:-6rem] xl:[--x:-7.10rem] 3xl:[--x:-9rem]",
    wrapperStyle: {
      transform: "translateX(var(--x)) rotate(var(--rot))",
      transformOrigin: "top right",
    },
    zIndex: 20,
  },
  {
    mediaType: "article",
    trapClassName:
      "[--trap-width:500px] [--trap-cut:473px] xl:[--trap-width:483.5px] xl:[--trap-cut:460px] 3xl:[--trap-width:759px] 3xl:[--trap-cut:731px]",
    wrapperClassName:
      "absolute top-0 right-0 h-full [--rot:23deg] xl:[--rot:40deg] 3xl:[--rot:36deg] [--x:-9rem] xl:[--x:-10.65rem] 3xl:[--x:-13.5rem]",
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
                background: color,
                clipPath: STRIPE_CLIP_PATH,
                WebkitClipPath: STRIPE_CLIP_PATH,
                opacity: isActive ? 1 : 0.35,
                filter: isActive ? "saturate(1)" : "saturate(0.4)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
