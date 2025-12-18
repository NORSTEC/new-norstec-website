"use client"

import Map from "@/components/items/map/Map";
import type { SectionMap as SectionMapType } from "@/types/sections/sectionMap";
import {PortableText} from "next-sanity";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import {useMemo, useState} from "react";
import MapFilter, {MapFilterId} from "@/components/items/map/MapFilter";

type SectionMapProps = {
    section: SectionMapType;
};

export default function SectionMap({ section }: SectionMapProps) {
    const [filter, setFilter] = useState<MapFilterId>("all");

    const filteredOrgs = useMemo(() => {
        const orgs = section.organizations ?? [];
        if (filter === "all") return orgs;
        return orgs.filter((o) => o.type === filter);
    }, [section.organizations, filter]);

    return (
        <section className="section mobile-section md:px-[40px]">
            <StripesVertical
                className="hidden md:flex"
                side="left"
            />

            <div className="flex flex-col lg:flex-row h-full w-full justify-between lg:gap-10">

                {/* Desktop */}
                <aside className="order-1 lg:order-2 flex flex-col lg:w-[clamp(50rem,50vw,80rem)]">
                    <div className="bg-egg md:pt-10 md:pb-5 flex md:justify-end">
                        <h2 className="text-h2 italic">{section.title}</h2>
                    </div>
                    <div className="bg-egg md:pb-10">
                        <PortableText
                            value={section.body}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <p className="mb-[1rem] last:mb-0">{children}</p>
                                    ),
                                },
                            }}
                        />
                    </div>

                    <MapFilter
                        value={filter}
                        onChange={setFilter}
                        className="hidden lg:inline-flex mt-2 md:mt-4"
                    />
                </aside>

                {/* Mobil*/}
                <div className="order-2 lg:order-1 lg:w-[clamp(30rem,50vw,40rem)] my-auto max-w-screen md:mx-0">
                    <MapFilter
                        value={filter}
                        onChange={setFilter}
                        className="inline-flex lg:hidden"
                    />
                    <div className="mx-auto md:mx-0 md:w-[65vw] lg:w-full">
                        <Map organizations={filteredOrgs} />
                    </div>
                </div>

            </div>
        </section>
    );
}