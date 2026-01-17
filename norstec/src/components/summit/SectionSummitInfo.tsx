import React from "react";
import { PortableText } from "next-sanity";
import { imageBuilder } from "@/utils/imageBuilder";
import type { SectionSummitInfo } from "@/types/sections/summit/sectionSummitInfo";

type Props = {
  section: SectionSummitInfo;
  className?: string;
};

export default function SectionSummitInfo({ section, className = "" }: Props) {
  const { title, body, image, imageAlt, captionName, captionEmail, captionPhone } = section;
  const imageSrc = imageBuilder(image, { width: 1400, quality: 95, fit: "max" });

  const hasCaption = captionName || captionEmail || captionPhone;

  return (
    <section className={`section desktop-container ${className}`}>
      <div className="flex flex-col gap-2">
        {title && (
          <h2 className="text-h2">
            {title}
            <span aria-hidden className="star-inline" />
          </h2>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-start">
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

          <div className="flex flex-col gap-4 lg:items-end">
            {imageSrc ? (
              <div className="relative w-full lg:w-[90%] xl:w-[80%] aspect-[3/5] max-h-[60vh] max-w-[45rem] overflow-hidden rounded-2xl bg-moody/5">
                <img
                  src={imageSrc}
                  alt={imageAlt || captionName || title || "Summit profile image"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="w-full lg:w-[90%] xl:w-[80%] aspect-[4/5] max-h-[28rem] rounded-2xl bg-moody/10" />
            )}

            {hasCaption && (
              <div className=" space-y-1 text-sm md:text-base">
                {captionName && <p className="font-semibold">{captionName}</p>}
                {captionEmail && (
                  <a className="block w-fit" href={`mailto:${captionEmail}`}>
                    {captionEmail}
                  </a>
                )}
                {captionPhone && (
                  <a className="block w-fit" href={`tel:${captionPhone}`}>
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
