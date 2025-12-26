import { PortableText } from "next-sanity";
import InitiativesCarousel from "@/components/items/initiatives/InitiativesCarousel";
import { SectionInitiatives as SectionInitiativesType } from "@/types/sections/sectionInitiatives";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";

export default function SectionInitiatives({ section }: { section: SectionInitiativesType }) {
    const { title, body, initiatives } = section;

    return (
        <section className="section">
            <ChemtrailsRight />
            <div className="flex flex-col h-full gap-5 lg:gap-0">
                <div className="chemtrails-right mobile-container pb-5! lg:pb-0!">
                    {title && <h2 className="text-h2 pb-2 uppercase">
                        {title}
                        <span
                            aria-hidden
                            className="star-inline"
                        />
                    </h2>}

                    <PortableText
                        value={body ?? []}
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

                <div className="flex-1 flex items-center justify-center ">
                    <InitiativesCarousel initiatives={initiatives} />
                </div>
            </div>
        </section>
    );
}