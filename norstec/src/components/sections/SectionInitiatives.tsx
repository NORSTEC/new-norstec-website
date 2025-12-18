import { PortableText } from "next-sanity";
import InitiativesCarousel from "@/components/items/initiatives/InitiativesCarousel";
import { SectionInitiatives as SectionInitiativesType } from "@/types/sections/sectionInitiatives";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";

export default function SectionInitiatives({ section }: { section: SectionInitiativesType }) {
    const { title, body, initiatives } = section;

    return (
        <section className="section">
            <ChemtrailsRight />
            <div className="flex flex-col h-full">
                <div className="md:w-[40rem] lg:w-[45rem] 2xl:w-[60rem] mr-[24vw] md:mr-0 md:px-[40px] md:pt-10 mobile-container container">
                    {title && <h2 className="text-h2 italic md:pb-5">{title}</h2>}

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