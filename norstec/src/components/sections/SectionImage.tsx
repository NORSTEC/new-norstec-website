import type { SectionImage as SectionImageType } from "@/types/sections/sectionImage";
import ImageCarousel from "@/components/items/images/ImageCarousel";
import ChemtrailsLeft from "@/components/items/stripes/chemtrails/ChemtrailsLeft";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";

type SectionImageProps = {
  section: SectionImageType;
  className?: string;
};

export default function SectionImage({ section, className = "" }: SectionImageProps) {
  const { images, mirrored } = section;
  const Chemtrails = mirrored ? ChemtrailsRight : ChemtrailsLeft;

  return (
    <section className={`section relative flex items-center justify-center ${className}`}>
      <Chemtrails />
      <div className="h-full w-full flex justify-center items-center lg:pb-16! lg:pt-[4rem]! mobile-container">
        <ImageCarousel images={images} />
      </div>
    </section>
  );
}
