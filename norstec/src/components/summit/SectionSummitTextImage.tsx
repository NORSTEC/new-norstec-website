import NextImage from "next/image";
import { PortableText } from "next-sanity";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionSummitTextImage as SectionSummitTextImageType } from "@/types/sections/summit/sectionSummitTextImage";

type SectionSummitTextImageProps = {
  section: SectionSummitTextImageType;
  className?: string;
};

export default function SectionSummitTextImage({ section, className = "" }: SectionSummitTextImageProps) {
  const { title, body, image, imageAlt, buttonHref, buttonLabel, mirrored } = section;

  const imageSrc = imageBuilder(image, { width: 900, quality: 90, fit: "max" });
  const showCta = buttonHref && buttonLabel;
  const isExternal = (buttonHref ?? "").startsWith("http");
  const stripesSide: "left" | "right" = mirrored ? "left" : "right";
  const stripesClass = mirrored ? "stripes-left" : "stripes-right";

  return (
    <section className={`section  relative ${className}`}>
      <StripesVertical side={stripesSide} />

      <div className={`${stripesClass} mobile-container flex flex-col items-start `}>
        {imageSrc && (
          <div className="w-full max-w-[14rem] md:max-w-[16rem] lg:max-w-[18rem]">
            <div className="relative aspect-video w-full overflow-hidden">
              <NextImage
                src={imageSrc}
                alt={imageAlt || title || "Summit image"}
                fill
                sizes="(min-width: 1280px) 18rem, (min-width: 768px) 16rem, 14rem"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {title && <h2 className="text-h2 pb-2">{title}</h2>}

        {body && (
          <div className="pb-5">
            <PortableText
              value={body}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-[1rem] last:mb-0">{children}</p>,
                },
              }}
            />
          </div>
        )}

        {showCta && (
          <a
            href={buttonHref}
            className="rounded-full px-4 py-1 transition-all border-2 border-moody cursor-pointer uppercase hover:bg-moody hover:text-egg"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </section>
  );
}
