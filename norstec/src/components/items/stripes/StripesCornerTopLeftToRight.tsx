"use client";

import React from "react";
import { motion } from "motion/react";
import { useStripePalette } from "@/hooks/useStripePalette";

const STRIPE_DELAY = 0.1;
const DURATION = 1;

type Config = {
  heightPx: number;
  offsetX: number;
  offsetY: number;

  strokeWidth: number;
  gap: number;
  cornerR: number;

  viewBoxW: number;
  viewBoxH: number;

  startX: number;
  startY: number;

  turnY: number;
  endX: number;
};

const CONFIG: Record<"base" | "xl" | "3xl", Config> = {
  base: {
    heightPx: 800,
    offsetX: -94.5,
    offsetY: 0,
    strokeWidth: 32,
    gap: 33.5,
    cornerR: 150,
    viewBoxW: 2600,
    viewBoxH: 1200,
    startX: 260,
    startY: 0,
    turnY: 900,
    endX: 4600,
  },
  xl: {
    heightPx: 800,
    offsetX: -61,
    offsetY: 0,
    strokeWidth: 36,
    gap: 42,
    cornerR: 150,
    viewBoxW: 2600,
    viewBoxH: 1200,
    startX: 260,
    startY: 0,
    turnY: 800,
    endX: 4600,
  },
  "3xl": {
    heightPx: 800,
    offsetX: 70,
    offsetY: 0,
    strokeWidth: 40,
    gap: 58,
    cornerR: 150,
    viewBoxW: 2600,
    viewBoxH: 1200,
    startX: 260,
    startY: 0,
    turnY: 800,
    endX: 4600,
  },
} as const;

function pickConfig(): Config {
  if (typeof window === "undefined") return CONFIG.base;
  if (window.matchMedia("(min-width: 2000px)").matches) return CONFIG["3xl"];
  if (window.matchMedia("(min-width: 1280px)").matches) return CONFIG.xl;
  return CONFIG.base;
}

function ElbowStripe({
  i,
  color,
  show,
  delay,
  duration,
  cfg,
  count,
}: {
  i: number;
  color: string;
  show: boolean;
  delay: number;
  duration: number;
  cfg: Config;
  count: number;
}) {
  const step = cfg.strokeWidth + cfg.gap;

  const x = cfg.startX + i * step;

  const j = count - 1 - i;
  const y = cfg.turnY + j * step;

  const r = cfg.cornerR + j * step;

  const d = [
    `M ${x} ${cfg.startY}`,
    `L ${x} ${y - r}`,
    `A ${r} ${r} 0 0 0 ${x + r} ${y}`,
    `L ${cfg.endX} ${y}`,
  ].join(" ");

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={cfg.strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: show ? 1 : 0 }}
      transition={{ delay, duration, ease: "easeInOut" }}
    />
  );
}

export default function StripesCornerTopLeftToRight({
  className = "",
  startDelay = 0,
}: {
  className?: string;
  startDelay?: number;
}) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [show, setShow] = React.useState(false);
  const [cfg, setCfg] = React.useState<Config>(() => CONFIG.base);
  const { colors } = useStripePalette();
  const paletteColors = colors;

  React.useEffect(() => {
    const apply = () => setCfg(pickConfig());
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const target = el.closest("section") || el.closest(".section") || el.parentElement;

    const start = () => {
      if (startDelay > 0) window.setTimeout(() => setShow(true), startDelay * 1000);
      else setShow(true);
    };

    if (!target) {
      start();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [startDelay]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`hidden lg:block absolute inset-x-0 top-0 pointer-events-none -z-10 ${className}`}
      style={{
        height: cfg.heightPx,
        transform: `translate(${cfg.offsetX}px, ${cfg.offsetY}px)`,
      }}
    >
      <svg
        viewBox={`0 0 ${cfg.viewBoxW} ${cfg.viewBoxH}`}
        width="3500px"
        height="110%"
        preserveAspectRatio="xMinYMin meet"
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        {paletteColors.map((c, i) => (
          <ElbowStripe
            key={c}
            i={i}
            color={c}
            show={show}
            delay={i * STRIPE_DELAY}
            duration={DURATION}
            cfg={cfg}
            count={paletteColors.length}
          />
        ))}
      </svg>
    </div>
  );
}
