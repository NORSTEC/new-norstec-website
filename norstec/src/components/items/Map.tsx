"use client";

import { useState } from "react";
import type { Organization } from "@/types/items/organization";
import { MOCK_ORGANIZATIONS } from "@/mock/organizations";

type MapProps = {
    organizations?: Organization[];
};

export default function Map({ organizations }: MapProps) {
    const orgs = organizations ?? MOCK_ORGANIZATIONS;

    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const hovered = hoveredId ? orgs.find((o) => o.id === hoveredId) ?? null : null;

    return (
        <section>
                    <svg
                        viewBox="0 0 1482 1763"
                        className="w-auto h-full"
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
                                r={18}
                                className={
                                    org.type === "incubator"
                                        ? "fill-sun stroke-egg stroke-1"
                                        : "fill-beachball stroke-egg stroke-1"
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
                    {hovered && (
                        <div
                            className="
                                pointer-events-none
                                absolute left-1/2 -top-4 z-10 -translate-x-1/2
                                md:left-auto md:right-0 md:top-1/4 md:translate-x-0
                                max-w-[260px] rounded-xl bg-moody px-4 py-3 text-sm text-egg shadow-lg
                            "
                        >
                            <h3 className="mb-1 font-semibold">{hovered.name}</h3>
                            <p className="text-xs leading-relaxed">
                                {hovered.description}
                            </p>
                        </div>
                    )}
        </section>
    );
}