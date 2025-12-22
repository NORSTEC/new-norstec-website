import type { SectionImage as SectionImageType } from "@/types/sections/sectionImage";
import ImageCarousel from "@/components/items/images/ImageCarousel";
import ChemtrailsLeft from "@/components/items/stripes/chemtrails/ChemtrailsLeft";

type SectionImageProps = {
    section: SectionImageType;
};

export default function SectionTextImage2({ section }: SectionImageProps) {
    const { images } = section;

    return (
        <section className="section relative flex items-center justify-center">
            <ChemtrailsLeft />
                    <div className="h-full w-full flex justify-center items-center md:pb-16! md:pt-[4rem]! mobile-container">
                        <ImageCarousel images={images}  />
                    </div>

        </section>
    );
}