import { PortableText } from "next-sanity";
import type { SectionTextImage as SectionTextImageType } from "@/types/sections/sectionTextImage";
import ImageCarousel from "@/components/items/ImageCarousel";
import Chemtrails from "@/components/items/stripes/Chemtrails";

type SectionTextImageProps = {
    section: SectionTextImageType;
};

export default function SectionTextImage({ section }: SectionTextImageProps) {
    const { title, body, images, mirrored } = section;

    return (
        <section className="section relative h-full overflow-hidden ">
            <Chemtrails />

            <div className="flex flex-col md:flex-row h-full  items-start relative z-10  md:px-[40px]">
                <div className="md:min-w-[30vw] 3xl:min-w-[40rem]  md:py-10">
                    {title && <h2 className="text-h2 italic">{title}</h2>}
                </div>

                <div className="md:py-10  md:pl-[8vw] 2xl:pl-[2vw] flex flex-col justify-center h-full">
                    <div className="md:flex-1 flex items-center h-full pt-5 md:pt-[5vh] order-1 md:order-2">
                        <ImageCarousel images={images} className="w-full" />
                    </div>

                    <div className="order-2 md:order-1 pt-5 md:py-0">
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

            </div>
        </section>
    );
}