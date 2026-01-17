"use client";

import React from "react";
import { motion } from "motion/react";
import { useStripePalette } from "@/hooks/useStripePalette";

const STRIPE_DELAY = 0.1;
const DURATION = 0.45;

type Config = {
  size: number;
  strokeWidth: number;
  gap: number;
  offsetX: number;
  offsetY: number;
  baseR: number;
};

const CONFIG: Record<"base" | "xl" | "3xl", Config> = {
  base: {
    size: 400,
    strokeWidth: 80,
    gap: 40,
    offsetX: -20,
    offsetY: 0,
    baseR: 650,
  },
  xl: {
    size: 500,
    strokeWidth: 72,
    gap: 40,
    offsetX: -26,
    offsetY: 0,
    baseR: 650,
  },
  "3xl": {
    size: 500,
    strokeWidth: 80,
    gap: 65,
    offsetX: 0,
    offsetY: 0,
    baseR: 952,
  },
};

function pickConfig(): Config {
  if (typeof window === "undefined") return CONFIG.base;

  if (window.matchMedia("(min-width: 2000px)").matches) {
    return CONFIG["3xl"];
  }

  if (window.matchMedia("(min-width: 1280px)").matches) {
    return CONFIG.xl;
  }

  return CONFIG.base;
}

function ArcStripe({
  r,
  color,
  show,
  delay,
  duration,
  strokeWidth,
}: {
  r: number;
  color: string;
  show: boolean;
  delay: number;
  duration: number;
  strokeWidth: number;
}) {
  const S = 1000;

  const startX = S - r;
  const startY = 0;
  const endX = S;
  const endY = r;

  const d = `M ${startX} ${startY} A ${r} ${r} 0 0 0 ${endX} ${endY}`;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="butt"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: show ? 1 : 0 }}
      transition={{ delay, duration, ease: "easeOut" }}
    />
  );
}

export default function StripesCornerTopRight({
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

  // Responsive config
  React.useEffect(() => {
    const apply = () => setCfg(pickConfig());
    apply();

    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // Intersection / delay
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const target = el.closest("section") || el.closest(".section") || el.parentElement;

    const start = () => {
      if (startDelay > 0) {
        window.setTimeout(() => setShow(true), startDelay * 1000);
      } else {
        setShow(true);
      }
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

  const step = cfg.strokeWidth + cfg.gap;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`hidden lg:block absolute right-0 top-0 pointer-events-none -z-10 ${className}`}
      style={{
        width: cfg.size,
        height: cfg.size,
        transform: `translate(${-cfg.offsetX}px, ${cfg.offsetY}px)`,
      }}
    >
      <svg viewBox="0 0 1000 1000" width="100%" height="100%">
        {paletteColors.map((c, i) => (
          <ArcStripe
            key={c}
            r={cfg.baseR - i * step}
            color={c}
            show={show}
            delay={i * STRIPE_DELAY}
            duration={DURATION}
            strokeWidth={cfg.strokeWidth}
          />
        ))}
      </svg>
    </div>
  );
}
