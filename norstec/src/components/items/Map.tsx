"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Organization } from "@/types/items/organization";
import { MOCK_ORGANIZATIONS } from "@/mock/organizations";

type MapProps = {
    organizations?: Organization[];
};

const VIEWBOX_WIDTH = 1482;
const VIEWBOX_HEIGHT = 1763;

export default function Map({ organizations }: MapProps) {
    const orgs = organizations ?? MOCK_ORGANIZATIONS;

    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const svgRef = useRef<SVGSVGElement | null>(null);

    const hovered = hoveredId ? orgs.find((o) => o.id === hoveredId) ?? null : null;

    useLayoutEffect(() => {
        if (!hovered || !svgRef.current) return;

        const rect = svgRef.current.getBoundingClientRect();
        const scaleX = rect.width / VIEWBOX_WIDTH;
        const scaleY = rect.height / VIEWBOX_HEIGHT;

        setTooltipPos({
            x: hovered.x * scaleX,
            y: hovered.y * scaleY,
        });
    }, [hovered]);

    const baseCircleClasses =
        "cursor-pointer outline-0";

    return (
        <section className="relative w-full">
            <div className="relative w-full flex justify-center ">
                <svg
                    ref={svgRef}
                    viewBox="0 0 1482 1763"
                    className="w-full h-auto max-h-[70vh]"
                    aria-label="Map of Norway with NORSTEC organisations"
                >
                    <image
                        href="/images/NorwayMap.svg"
                        x={0}
                        y={0}
                        width={1482}
                        height={1763}
                        preserveAspectRatio="xMidYMid meet"
                    />

                    {orgs.map((org) => (
                        <circle
                            key={org.id}
                            cx={org.x}
                            cy={org.y}
                            r={22}
                            className={
                                baseCircleClasses +
                                " " +
                                (org.type === "incubator"
                                    ? "fill-sun stroke-egg stroke-[4]"
                                    : "fill-beachball stroke-egg stroke-[4]")
                            }
                            onMouseEnter={() => setHoveredId(org.id)}
                            onMouseLeave={() =>
                                setHoveredId((prev) => (prev === org.id ? null : prev))
                            }
                            onFocus={() => setHoveredId(org.id)}
                            onBlur={() =>
                                setHoveredId((prev) => (prev === org.id ? null : prev))
                            }
                            tabIndex={0}
                        >
                            <title>{org.name}</title>
                        </circle>
                    ))}
                </svg>

                {/* Tooltip */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            key={hovered.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-20 pointer-events-none"
                            style={{
                                left: tooltipPos.x,
                                top: tooltipPos.y - 30,
                                transform: "translate(-50%, -100%)",
                            }}
                        >
                            <div className="rounded-xl bg-moody text-egg px-4 py-3 shadow-lg max-w-[260px] text-sm">
                                <h3 className="font-semibold mb-1">{hovered.name}</h3>
                                <p className="text-xs leading-relaxed">
                                    {hovered.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}