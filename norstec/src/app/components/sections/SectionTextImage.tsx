import { PortableText } from "next-sanity";
import StripesVertical from "@/app/components/items/StripesVertical";
import type { SectionTextImage as SectionTextImageType } from "@/app/types/sections/sectionTextImage";
import ImageCarousel from "@/app/components/items/ImageCarousel";

type SectionTextImageProps = {
    section: SectionTextImageType;
};

export default function SectionTextImage({ section }: SectionTextImageProps) {
    const { title, body, images, mirrored } = section;

    return (
        <section className="relative h-screen">
            <StripesVertical className="hidden md:flex pl-[7vw] 3xl:pl-[15rem]"/>

            <div className="flex flex-col md:flex-row h-full items-start relative z-10 px-[20px] md:px-[40px]">
                <div className="md:min-w-[30vw]  3xl:pl-[3vw] 3xl:min-w-[40rem] bg-egg py-10">
                    {title && <h2 className="text-h2 italic">{title}</h2>}
                </div>

                <div className="py-10 bg-egg md:pl-[8vw] 2xl:pl-[2vw] flex flex-col justify-center h-full">
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

                    <div className="flex-1 flex ">
                        <ImageCarousel images={images} className="w-full" />
                    </div>
                </div>

            </div>
        </section>
    );
}