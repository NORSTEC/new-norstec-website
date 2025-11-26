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

    const organizations = section.organizations ?? [];

    const filteredOrgs = useMemo(() => {
        if (filter === "all") return organizations;
        return organizations.filter((o) => o.type === filter);
    }, [organizations, filter]);

    return (
        <section className="section md:px-[40px]">
            <StripesVertical
                className="hidden md:flex pr-[7vw] 3xl:pr-[15rem]"
                side="right"
            />

            <div className="flex flex-col lg:flex-row h-full w-full justify-between lg:gap-10">
                <MapFilter
                    value={filter}
                    onChange={setFilter}
                    className="inline-flex lg:hidden"
                />
                <div className="w-[clamp(30rem,50vw,40rem)] md:py-10 my-auto max-w-screen mx-auto md:mx-0">
                    <Map organizations={filteredOrgs} />
                </div>


                <aside className="flex flex-col lg:w-[clamp(50rem,50vw,80rem)]">
                    <div className="bg-egg md:pt-10 md:pb-5 flex md:justify-end">
                        <h2 className="text-h2 italic">
                            {section.title}
                        </h2>
                    </div>
                    <div className="bg-egg md:pb-10">
                        <PortableText
                            value={section.body}
                            components={{
                                block: {
                                    normal: ({ children }) => (
                                        <p className="mb-[1rem] last:mb-0">
                                            {children}
                                        </p>
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
            </div>
        </section>
    );
}