"use client";

import React from "react";
import { PortableText } from "next-sanity";
import type { SectionStats as SectionStatsType } from "@/types/sections/sectionStats";

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
    const items = (section.items ?? []).filter(
        (it): it is NonNullable<typeof it> => it != null
    );

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(0);
    const [counts, setCounts] = React.useState<number[]>(
        () => items.map(() => 0)
    );

    React.useEffect(() => {
        if (!show) return;
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
    }, [show, activeIndex, items]);


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

    const isFull = !!section.fullStripes;


    // =========================
    // FULL STRIPES LAYOUT
    // =========================
    if (isFull) {
        return (
            <section ref={rootRef} className="section">
                <ul className="grid grid-rows-4 h-full">
                    {(section.items ?? []).filter(Boolean).map((item, index) => {
                        const c = COLORS[index % COLORS.length];
                        const value = formatValue(item);

                        return (
                            <li
                                key={item._key}
                                className={`flex items-center text-white ${c.bar} px-10 md:px-24`}
                            >
                                <article className="flex w-full items-center gap-12">
                                    {/* LEFT */}
                                    <div className="shrink-0">
                                        <strong className="block text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                            {value}
                                        </strong>
                                    </div>

                                    {/* RIGHT */}
                                    {item.caption && (
                                        <div className="flex-1">
                                            <PortableText
                                                value={item.caption}
                                                components={{
                                                    block: {
                                                        normal: ({ children }) => (
                                                            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-95">
                                                                {children}
                                                            </p>
                                                        ),
                                                    },
                                                }}
                                            />
                                        </div>
                                    )}
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </section>
        );
    }





    // =========================
    // COMPACT LAYOUT (LIKE SCREENSHOT)
    // =========================
    return (
        <section ref={rootRef} className="section">
            <div className="h-full w-full flex flex-col">
                {/* Title */}


                {section.title && (
                    <div className="pb-0! desktop-container">
                        <h2 className="text-h2">{section.title}
                            <span
                                aria-hidden
                                className="star-inline"
                            />
                        </h2>
                    </div>
                )}

                {/* Content area */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 flex-1 desktop-container pt-5! xl:pt-20">
                    {items.map((item, index) => {
                        const c = COLORS[index % COLORS.length];

                        const target = getTargetNumber(item);
                        const current = counts[index] ?? 0;

                        const phase: "pending" | "running" | "done" =
                            index < activeIndex ? "done" : index === activeIndex ? "running" : "pending";

                        const displayNumber =
                            phase === "done" ? target : phase === "running" ? current : 0;


                        return (
                            <article key={item._key} className="flex flex-col">
                                <div className="flex items-start gap-5">
                                    {/* Vertikal linje */}
                                    <div className="shrink-0">
                                        <div className={`${c.bar} w-3 h-full min-h-[4rem]`} />
                                    </div>

                                    {/* Value */}
                                    <div>
                                      <span className="text-[3.5rem] lg:text-[4rem] leading-none font-extrabold text-moody whitespace-nowrap">
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

                {/* Bottom horizontal stripes (loader-sekvens) */}
                <div className="mt-10 space-y-4 lg:pb-20 hidden md:block">
                    {items.map((_, i) => {
                        const c = COLORS[i % COLORS.length];
                        const p = i < activeIndex ? 1 : i === activeIndex ? progress : 0;

                        return (
                            <div key={i} className="relative h-12 w-full overflow-hidden">
                                <div
                                    className={`${c.bar} absolute inset-y-0 left-0`}
                                    style={{ width: `${p * 100}%` }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
