"use client";

import React from "react";
import { PortableText } from "next-sanity";
import type { SectionStats as SectionStatsType } from "@/types/sections/sectionStats";
import { motion } from "motion/react";

type SectionStatsProps = {
  section: SectionStatsType;
};

const COLORS = [
  { bar: "bg-sky", text: "text-sky" },
  { bar: "bg-beachball", text: "text-beachball" },
  { bar: "bg-sun", text: "text-sun" },
  { bar: "bg-copper", text: "text-copper" },
] as const;

function fmtAffix(v?: string) {
  return v && v !== "none" ? v : "";
}

function formatValue(item: SectionStatsType["items"][number]) {
  const prefix = fmtAffix(item.prefix);
  const suffix = fmtAffix(item.suffix);

  if (typeof item.numberValue === "number") {
    return `${prefix}${item.numberValue}${suffix}`;
  }

  if (item.textValue && item.textValue.trim()) {
    return item.textValue;
  }

  return "";
}

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function countDecimals(n: number) {
  const s = String(n);
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}

function formatCompactValue(
  item: SectionStatsType["items"][number],
  currentNumber: number,
  phase: "pending" | "running" | "done"
) {
  const prefix = fmtAffix(item.prefix);
  const suffix = fmtAffix(item.suffix);

  if (typeof item.numberValue !== "number") {
    return item.textValue?.trim() ?? "";
  }

  if (phase === "pending") {
    return `${prefix}0${suffix}`;
  }

  const decimals = countDecimals(item.numberValue);
  const shown = currentNumber.toFixed(decimals);

  return `${prefix}${shown}${suffix}`;
}

function getTargetNumber(item: SectionStatsType["items"][number]) {
  return typeof item.numberValue === "number" ? item.numberValue : 0;
}

export default function SectionStats({ section }: SectionStatsProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const [show, setShow] = React.useState(false);
  const [startAnim, setStartAnim] = React.useState(false);
  const items = (section.items ?? []).filter((it): it is NonNullable<typeof it> => it != null);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [counts, setCounts] = React.useState<number[]>(() => items.map(() => 0));
  const isFull = !!section.fullStripes;
  const countUp = !isFull && section.countUp !== false;
  const STRIPE_COUNT = 4;
  const START_DELAY_MS = 450;

  React.useEffect(() => {
    if (!countUp) return;
    if (isFull) return;
    if (!startAnim) return;
    if (items.length === 0) return;

    let raf = 0;
    let start = 0;

    const durationMs = 900;
    const idx = activeIndex;
    const target = getTargetNumber(items[idx]);

    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const p = clamp01(elapsed / durationMs);

      setProgress(p);

      setCounts((prev) => {
        const next = [...prev];
        next[idx] = target * p;
        return next;
      });

      if (p < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setCounts((prev) => {
        const next = [...prev];
        next[idx] = target;
        return next;
      });

      if (idx < items.length - 1) {
        setActiveIndex(idx + 1);
        setProgress(0);
        start = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startAnim, activeIndex, items, countUp, isFull]);

  React.useEffect(() => {
    setCounts(items.map(() => 0));
    setActiveIndex(0);
    setProgress(0);
  }, [items, countUp, isFull]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!show) return;
    const id = window.setTimeout(() => setStartAnim(true), START_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [show, START_DELAY_MS]);

  const gridColsClass = items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  // =========================
  // FULL STRIPES LAYOUT
  // =========================
  if (isFull) {
    const rowDuration = 0.55;
    const stagger = 0.12;

    return (
      <section ref={rootRef} className="section relative overflow-hidden lg:h-screen!">
        <ul className="grid grid-rows-4 h-full py-28 md:py-52 lg:py-0!">
          {items.map((item, index) => {
            const c = COLORS[index % COLORS.length];
            const value = formatValue(item);

            return (
              <li key={item._key} className="relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 ${c.bar}`}
                  initial={{ x: "-105%" }}
                  animate={show ? { x: "0%" } : { x: "-105%" }}
                  transition={{
                    duration: rowDuration,
                    ease: "easeOut",
                    delay: index * stagger,
                  }}
                />

                {/* Innhold */}
                <div className="relative h-full w-full desktop-container py-5! lg:py-0!">
                  <div className="h-full flex gap-10 justify-center items-start flex-col lg:flex-row lg:items-center">
                    <div className="min-w-[25vw]">
                      <h3 className="text-[2rem] md:text-[3rem] xl:text-[3rem] 2xl:text-[5rem] text-moody leading-none">
                        {value}
                      </h3>

                      {item.captionTitle && (
                        <p className=" text-moody italic text-[1.35rem] md:text-[1.75rem] xl:text-[1.5rem] 2xl:text-[2.5rem] mt-2">
                          {item.captionTitle}
                        </p>
                      )}
                    </div>

                    {/* Under: caption */}
                    {item.caption && (
                      <div className="text-moody">
                        <PortableText
                          value={item.caption}
                          components={{
                            block: {
                              normal: ({ children }) => <p>{children}</p>,
                            },
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  // =========================
  // COMPACT LAYOUT
  // =========================
  return (
    <section ref={rootRef} className="section">
      <div className="h-full w-full flex flex-col">
        {/* Title */}

        {section.title && (
          <div className="pb-0! desktop-container">
            <h2 className="text-h2">
              {section.title}
              <span aria-hidden className="star-inline" />
            </h2>
          </div>
        )}

        {/* Content area */}
        <div className="h-full flex items-center">
          <div
            className={`grid grid-cols-1 ${gridColsClass} gap-10 flex-1 desktop-container pt-5! xl:pb-5! xl:pt-20`}
          >
            {items.map((item, index) => {
              const c = COLORS[index % COLORS.length];

              const target = getTargetNumber(item);
              const current = counts[index] ?? 0;

              const phase: "pending" | "running" | "done" = !countUp
                ? "done"
                : index < activeIndex
                  ? "done"
                  : index === activeIndex
                    ? "running"
                    : "pending";

              const displayNumber = !countUp
                ? target
                : phase === "done"
                  ? target
                  : phase === "running"
                    ? current
                    : 0;

              return (
                <article key={item._key} className="flex flex-col">
                  <div className="flex items-start gap-5">
                    {/* Vertikal linje */}
                    <div className="shrink-0">
                      <div className={`${c.bar} w-3 h-full min-h-[4rem] 3xl:min-h-[6rem]`} />
                    </div>

                    {/* Value */}
                    <div>
                      <span className="text-[3.5rem] lg:text-[4rem] 3xl:text-[6rem] leading-none font-extrabold text-moody whitespace-nowrap">
                        {formatCompactValue(item, displayNumber, phase)}
                      </span>
                    </div>
                  </div>

                  {/* Caption */}
                  {item.caption && (
                    <div className="mt-2 lg:mt-5">
                      <PortableText
                        value={item.caption}
                        components={{
                          block: {
                            normal: ({ children }) => <p>{children}</p>,
                          },
                        }}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom horizontal stripes (loader-sekvens) */}
        <div className="space-y-4 lg:pb-20 hidden md:block">
          {Array.from({ length: STRIPE_COUNT }).map((_, i) => {
            const c = COLORS[i % COLORS.length];

            if (countUp) {
              const p =
                i < items.length ? (i < activeIndex ? 1 : i === activeIndex ? progress : 0) : 0;

              return (
                <div key={i} className="relative h-12 w-full overflow-hidden">
                  <div
                    className={`${c.bar} absolute inset-y-0 left-0`}
                    style={{ width: `${p * 100}%` }}
                  />
                </div>
              );
            }

            return (
              <div key={i} className="relative h-10 w-full overflow-hidden">
                <motion.div
                  className={`${c.bar} absolute inset-0`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: startAnim ? 1 : 0 }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
