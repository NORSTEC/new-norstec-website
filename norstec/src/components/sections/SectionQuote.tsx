import { PortableText } from "next-sanity";
import type { SectionQuote as SectionQuoteType } from "@/types/sections/sectionQuote";
import ChemtrailsLeft from "@/components/items/stripes/chemtrails/ChemtrailsLeft";
import StripesCornerTopLeftToRight from "@/components/items/stripes/StripesCornerTopLeftToRight";
import React from "react";

type SectionQuoteProps = {
  section: SectionQuoteType;
};

export default function SectionQuote({ section }: SectionQuoteProps) {
  const { header, body } = section;

  return (
    <section className="section relative lg:h-[clamp(500px,100vh,1000px)]  mobile-container lg:py-0!">
      <StripesCornerTopLeftToRight />

      <div className="lg:h-[550px] stripes-left ">
        <div className="flex h-full justify-center items-center">
          <div className="flex gap-5 xl:gap-20 xl:flex-row flex-col">
            <h2 className="text-h2 lg:font-bold lg:text-nowrap">
              {header}
              <span aria-hidden className="inline-block lg:hidden star-inline" />
            </h2>

            {body?.length ? (
              <div>
                <PortableText
                  value={body}
                  components={{
                    block: {
                      normal: ({ children }) => <p className="mb-[1rem] last:mb-0">{children}</p>,
                    },
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
