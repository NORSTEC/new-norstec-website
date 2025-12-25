import { PortableText } from "next-sanity";
import type { SectionTextImage as SectionTextImageType } from "@/types/sections/sectionTextImage";
import ImageCarousel from "@/components/items/images/ImageCarousel";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import ImageContainer from "@/components/items/images/ImageContainer";

type SectionTextImageProps = {
    section: SectionTextImageType;
};

export default function SectionTextImage({ section }: SectionTextImageProps) {
    const { title, body, images, mirrored, threeImageLayout, featuredPosition } = section;

    const total = images?.length ?? 0;
    const useContainer = total > 0 && total <= 3;

    const stripesSide: "left" | "right" = mirrored ? "right" : "left";
    const stripesClass = mirrored ? "stripes-right" : "stripes-left";

    return (
        <section className="section relative mobile-container h-full">

            <StripesVertical side={stripesSide} />
            <div className={`flex flex-col h-full ${stripesClass} lg:gap-10 py-0!`}>

                <div>
                    {title && <h2 className="order-1 text-h2 pb-2 uppercase">
                        {title}
                        <span
                            aria-hidden
                            className="star-inline"
                        />
                    </h2>}

                    <div className="hidden lg:block lg:py-0">
                        <PortableText
                            value={body}
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
                </div>

                <div className="md:flex-1 flex items-center h-full pb-2 lg:pb-0">
                    {useContainer ? (
                        <ImageContainer
                            images={images}
                            className="w-full"
                            threeImageLayout={threeImageLayout}
                            featuredPosition={featuredPosition}
                        />
                    ) : (
                        <ImageCarousel images={images} className="w-full" />
                    )}
                </div>
                <div className="block lg:hidden lg:py-0">
                    <PortableText
                        value={body}
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
            </div>

        </section>
    );
}