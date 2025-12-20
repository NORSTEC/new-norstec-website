"use client"

import Map from "@/components/items/map/Map";
import type { SectionMap as SectionMapType } from "@/types/sections/sectionMap";
import {PortableText} from "next-sanity";
import {useMemo, useState} from "react";
import MapFilter, {MapFilterId} from "@/components/items/map/MapFilter";
import StripesBottomRight from "@/components/items/stripes/StripesCornerBottomRight";

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
        <section className="section">
            <StripesBottomRight startDelay={0.3}/>

            <div className="flex h-full w-full justify-between stripes-left pl-0! mobile-container">
                <div className="w-full h-full flex-1">
                    <Map organizations={filteredOrgs} />
                </div>
                <aside className="flex flex-col flex-1">
                    <h2 className="text-h2 italic">{section.title}</h2>
                    <div className="md:pb-10">
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
                        className="mt-2 md:pb-10"
                    />
                    <div>

                    <p className="italic font-[400] flex items-center">
                        <span className="icon icon-24 md:icon-40 icon-400 rotate-[180deg]">trending_flat</span>
                        Hover over each dot to read more
                    </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}