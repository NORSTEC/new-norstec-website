import type { SectionImage as SectionImageType } from "@/types/sections/sectionImage";
import ImageCarousel from "@/components/items/images/ImageCarousel";
import ChemtrailsLeft from "@/components/items/stripes/chemtrails/ChemtrailsLeft";

type SectionImageProps = {
    section: SectionImageType;
};

export default function SectionImage({ section }: SectionImageProps) {
    const { images } = section;

    return (
        <section className="section relative flex items-center justify-center">
            <ChemtrailsLeft />
                    <div className="h-full w-full flex justify-center items-center lg:pb-16! lg:pt-[4rem]! mobile-container">
                        <ImageCarousel images={images}  />
                    </div>
        </section>
    );
}