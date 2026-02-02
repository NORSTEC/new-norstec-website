"use client";

import ChemtrailsFilter from "@/components/items/stripes/chemtrails/ChemtrailsFilter";
import { MediaType } from "@/types/media";
import React from "react";

type Props = {
  selected: MediaType[];
  setSelected: React.Dispatch<React.SetStateAction<MediaType[]>>;
};

export default function FilterSection({ selected, setSelected }: Props) {
  return (
    <section className="section relative mobile-container no-snap">
      <ChemtrailsFilter selected={selected} setSelected={setSelected} />
      {/* Overlay labels (non-interactive). Tweak the per-breakpoint classes below. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {[
          {
            text: "youtube",
            posClasses:
              "top-[18%] right-[8%] xl:top-[93%] xl:right-[8%] 3xl:top-[26%] 3xl:right-[12%]",
          },
          {
            text: "instagram",
            posClasses:
              "top-[32%] right-[10%] xl:top-[93%] xl:right-[23%] 3xl:top-[40%] 3xl:right-[14%]",
          },
          {
            text: "linkedin",
            posClasses:
              "top-[48%] right-[14%] xl:top-[93%] xl:right-[43%] 3xl:top-[52%] 3xl:right-[18%]",
          },
          {
            text: "article",
            posClasses:
              "top-[62%] right-[18%] xl:top-[93%] xl:right-[68%] 3xl:top-[66%] 3xl:right-[22%]",
          },
        ].map((label) => (
          <span
            key={label.text}
            className={`absolute ${label.posClasses} text-h2 font-normal uppercase tracking-[0.1em] text-moody`}
          >
            {label.text}
          </span>
        ))}
      </div>
    </section>
  );
}
