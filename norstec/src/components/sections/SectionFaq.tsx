"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { PortableText } from "next-sanity";
import type { SectionFaq as SectionFaqType } from "@/types/sections/sectionFaq";
import StripesCornerTopRight from "@/components/items/stripes/StripesCornerTopRight";
import StripesCornerBottomRight from "@/components/items/stripes/StripesCornerBottomRight";

type SectionFaqProps = {
  section: SectionFaqType;
  className?: string;
};

type FaqItemProps = {
  item: SectionFaqType["items"][number];
  isLast: boolean;
};

const listVariants = {
  closed: {
    transition: {
      staggerChildren: 0,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

function FaqItem({ item, isLast }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && ref.current) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open, item]);

  return (
    <div className={`border-moody ${isLast ? "border-b border-t" : "border-t"}`}>
      <button
        type="button"
        className="w-full py-[10px] flex justify-between items-center transition-all duration-100 cursor-pointer text-left"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <h3 className="text-h3 font-light">{item.question}</h3>

        <span
          className={`icon icon-24 icon-400 transition-transform duration-100 text-moody ${open ? "rotate-90" : "rotate-0"}`}
          aria-hidden
        >
          arrow_right_alt
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-100 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <motion.div
          ref={ref}
          className="pb-[24px] pt-[10px] flex flex-col gap-3"
          variants={listVariants}
          initial={false}
          animate={open ? "open" : "closed"}
          style={{ willChange: "transform, height" }}
        >
          <PortableText
            value={item.answer}
            components={{
              block: {
                normal: ({ children }) => <p className="leading-7 md:leading-8">{children}</p>,
              },
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function SectionFaq({ section, className = "" }: SectionFaqProps) {
  const {
    items = [],
    showStripesCornerTopRight = false,
    showStripesCornerBottomRight = false,
  } = section;

  if (!items.length) return null;

  return (
    <section className={`section flex flex-col gap-6 stripes-right mobile-container ${className}`}>
      {showStripesCornerTopRight && <StripesCornerTopRight />}
      {showStripesCornerBottomRight && <StripesCornerBottomRight startDelay={0.4} />}
      <div>
        <h2 className="text-h2 uppercase">
          {section.title}
          <span aria-hidden className="star-inline" />
        </h2>
      </div>

      <div className="flex flex-col">
        {items.map((item, index) => (
          <FaqItem key={item._id ?? index} item={item} isLast={index === items.length - 1} />
        ))}
      </div>
    </section>
  );
}
