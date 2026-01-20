import React from "react";
import { PortableText } from "next-sanity";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionSummitInfo } from "@/types/sections/summit/sectionSummitInfo";

type Props = {
  section: SectionSummitInfo;
  className?: string;
};

export default function SectionSummitInfo({ section, className = "" }: Props) {
  const { title, body, image, imageAlt, captionTitle, captionName, captionEmail, captionPhone } = section;
  const imageSrc = imageBuilder(image, { width: 1400, quality: 95, fit: "max" });

  const hasCaption = captionTitle || captionName || captionEmail || captionPhone;

  return (
    <section className={`section desktop-container ${className}`}>
      <div className="flex flex-col gap-2">
        {title && (
          <h2 className="text-h2">
            {title}
            <span aria-hidden className="star-inline" />
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start gap-10">
          <div>
            {body ? (
              <PortableText
                value={body}
                components={{
                  block: {
                    normal: ({ children }) => <p className="mb-[1rem] last:mb-0">{children}</p>,
                  },
                }}
              />
            ) : (
              <p className="text-moody/70">Content coming soon.</p>
            )}
          </div>

          <div className="flex flex-row items-start gap-4 md:gap-6 lg:flex-col lg:items-end">
            {imageSrc ? (
              <div className="relative w-[45vw] max-w-[14rem] md:w-[50vw] lg:w-[22rem] xl:w-[26rem] 3xl:w-[30rem] aspect-[3/5] max-h-[50vh] max-w-[45rem] overflow-hidden rounded-2xl bg-moody/5">
                <img
                  src={imageSrc}
                  alt={imageAlt || captionName || title || "Summit profile image"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-[45vw] max-w-[14rem] md:w-[50vw] lg:w-[22rem] xl:w-[26rem] 3xl:w-[30rem] aspect-[4/5] max-h-[28rem] rounded-2xl bg-moody/10" />
            )}

            {hasCaption && (
              <div className="flex-1 w-auto lg:w-[22rem] xl:w-[26rem] 3xl:w-[30rem] text-sm md:text-base text-left">
                {captionName && <p className="font-bold">{captionName}</p>}
                {captionTitle && <p className="font-semibold">{captionTitle}</p>}
                {captionEmail && (
                  <a className="block w-fit pb-1 underline" href={`mailto:${captionEmail}`}>
                    {captionEmail}
                  </a>
                )}
                {captionPhone && (
                  <a className="block w-fit underline" href={`tel:${captionPhone}`}>
                    {captionPhone}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
