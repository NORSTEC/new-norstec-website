"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Organization } from "@/types/items/organization";

type MapProps = {
    organizations?: Organization[];
};

const VIEWBOX_WIDTH = 1482;
const VIEWBOX_HEIGHT = 1763;


export default function Map({ organizations }: MapProps) {
    const orgs = (organizations ?? []).filter(
        (org): org is Organization & { mapPosition: { x: number; y: number } } =>
            !!org.mapPosition
    );

    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const svgRef = useRef<SVGSVGElement | null>(null);

    const hovered = hoveredId ? orgs.find((o) => o._id === hoveredId) ?? null : null;

    useLayoutEffect(() => {
        if (!hovered || !svgRef.current) return;

        const rect = svgRef.current.getBoundingClientRect();
        const scaleX = rect.width / VIEWBOX_WIDTH;
        const scaleY = rect.height / VIEWBOX_HEIGHT;

        setTooltipPos({
            x: hovered.mapPosition.x * scaleX,
            y: hovered.mapPosition.y * scaleY,
        });
    }, [hovered]);

    const baseCircleClasses =
        "cursor-pointer outline-0 hover:stroke-moody hover:z-40 transition-all";

    return (
        <section className="relative w-full">
            <div className="relative w-full flex justify-center">
                <svg
                    ref={svgRef}
                    viewBox="0 0 1482 1763"
                    className="w-full h-auto max-h-[70vh]  "
                    aria-label="Map of Norway with NORSTEC organisations"
                >
                    <image
                        href="/images/NorwayMap2.svg"
                        x={0}
                        y={0}
                        width={1482}
                        height={1763}
                        preserveAspectRatio="xMidYMid meet"
                    />

                    {orgs.map((org) => (
                        <circle
                            key={org._id}
                            cx={org.mapPosition.x}
                            cy={org.mapPosition.y}
                            r={30}
                            className={
                                baseCircleClasses +
                                " " +
                                (org.type === "incubator"
                                    ? "fill-sun stroke-egg stroke-[8]"
                                    : "fill-beachball stroke-egg stroke-[8]")
                            }
                            onMouseEnter={() => setHoveredId(org._id)}
                            onMouseLeave={() =>
                                setHoveredId((prev) => (prev === org._id ? null : prev))
                            }
                            onFocus={() => setHoveredId(org._id)}
                            onBlur={() =>
                                setHoveredId((prev) => (prev === org._id ? null : prev))
                            }
                            tabIndex={0}
                        >
                        </circle>
                    ))}
                </svg>

                {/* Tooltip */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            key={hovered._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="hidden md:block md:absolute z-20 pointer-events-none lg:ml-8"
                            style={{
                                left: tooltipPos.x,
                                top: tooltipPos.y,
                                transform: "translate(20%, -50%)",
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