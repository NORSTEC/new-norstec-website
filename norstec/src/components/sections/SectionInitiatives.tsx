import { PortableText } from "next-sanity";
import InitiativesCarousel from "@/components/items/initiatives/InitiativesCarousel";
import { SectionInitiatives as SectionInitiativesType } from "@/types/sections/sectionInitiatives";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";

export default function SectionInitiatives({ section }: { section: SectionInitiativesType }) {
    const { title, body, initiatives } = section;

    return (
        <section className="section">
            <ChemtrailsRight />
            <div className="flex flex-col h-full py-20 lg:py-0 lg:pb-20 gap-5 lg:gap-0">
                <div className="chemtrails-right mobile-container py-0! lg:py-20!">
                    {title && <h2 className="text-h2 pb-5 uppercase">
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

                <div className="flex-1 flex items-center justify-center 3xl:px-[40px]">
                    <InitiativesCarousel initiatives={initiatives} />
                </div>
            </div>
        </section>
    );
}