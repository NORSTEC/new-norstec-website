import Map from "@/components/items/Map";
import type { SectionMap as SectionMapType } from "@/types/sections/sectionMap";
import {PortableText} from "next-sanity";
import StripesVertical from "@/components/items/stripes/StripesVertical";

type SectionMapProps = {
    section: SectionMapType;
};

export default function SectionMap({ section }: SectionMapProps) {
    return (
        <section className="section md:px-[40px]">
            <StripesVertical
                className="hidden md:flex pr-[7vw] 3xl:pr-[15rem]"
                side="right"
            />

            <div className="flex flex-col lg:flex-row h-full w-full justify-between gap-10">
                <div className="w-[clamp(30rem,50vw,40rem)] md:py-10 my-auto max-w-screen mx-auto">
                    <Map organizations={section.organizations} />
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
                </aside>
            </div>
        </section>
    );
}