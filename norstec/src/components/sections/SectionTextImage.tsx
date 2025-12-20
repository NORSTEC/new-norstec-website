import { PortableText } from "next-sanity";
import type { SectionTextImage as SectionTextImageType } from "@/types/sections/sectionTextImage";
import ImageCarousel from "@/components/items/ImageCarousel";
import StripesVertical from "@/components/items/stripes/StripesVertical";

type SectionTextImageProps = {
    section: SectionTextImageType;
};

export default function SectionTextImage2({ section }: SectionTextImageProps) {
    const { title, body, images, mirrored } = section;

    return (
        <section className="section relative mobile-container">

            <StripesVertical
                side="left"
            />
            <div className="flex flex-col justify-center h-full stripes-left lg:gap-10">

                <div>
                    {title && <h2 className="order-1 text-h2 italic pb-5">{title}</h2>}

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

                <div className="md:flex-1 flex items-center h-full pb-5 lg:pb-0">
                    <ImageCarousel images={images} className="w-full" />
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