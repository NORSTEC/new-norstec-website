import Map from "@/components/items/Map";
import type { SectionMap as SectionMapType } from "@/types/sections/sectionMap";
import {PortableText} from "next-sanity";

type SectionMapProps = {
    section: SectionMapType;
};

export default function SectionMap({ section }: SectionMapProps) {
    return (
        <section className="section">
            {section.title && <h2 className="text-h2">{section.title}</h2>}
            <div className="flex">
                <Map organizations={section.organizations} />
                <aside>
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
                </aside>
            </div>
        </section>
    );
}