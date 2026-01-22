"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { SectionTable } from "@/types/sections/sectionTable";

type CollapsibleListProps = {
  columns: SectionTable["columns"];
  rows: SectionTable["rows"];
};

type CollapsibleItemProps = {
  row: SectionTable["rows"][number];
  columns: SectionTable["columns"];
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

export default function CollapsibleList({ columns, rows }: CollapsibleListProps) {
  if (!rows || rows.length === 0) return null;

  return (
    <div>
      {rows.map((row, index) => (
        <CollapsibleItem
          key={index}
          row={row}
          columns={columns}
          isLast={index === rows.length - 1}
        />
      ))}
    </div>
  );
}

function CollapsibleItem({ row, columns, isLast }: CollapsibleItemProps) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const timing = "cubic-bezier(0.24, 0.84, 0.42, 1)";

  const cells = row?.cells ?? [];
  const title = cells[0] ?? "—";

  useEffect(() => {
    if (open && ref.current) {
      setHeight(ref.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (ref.current) setHeight(ref.current.scrollHeight);
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [open]);

  return (
    <div className={`border-moody ${isLast ? "border-b border-t" : "border-t"}`}>
      <div
        className="py-[10px] flex justify-between items-center transition-all duration-100 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h3 className="font-light text-lg">{title}</h3>

        <span
          className={`icon icon-24 icon-400 transition-transform duration-200 text-moody ${
            open ? "rotate-90" : "rotate-0"
          }`}
          style={{ transitionTimingFunction: timing }}
        >
          arrow_right_alt
        </span>
      </div>

      {/* Collapsible innhold */}
      <div
        className="overflow-hidden transition-[max-height] duration-300"
        style={{ maxHeight: `${height}px`, transitionTimingFunction: timing }}
      >
        <motion.div
          ref={ref}
          className="pb-[24px] pt-[10px] flex flex-col gap-3"
          variants={listVariants}
          initial={false}
          animate={open ? "open" : "closed"}
          style={{ willChange: "transform, height", transitionTimingFunction: timing }}
          transition={{ duration: 0.24, ease: [0.24, 0.84, 0.42, 1] }}
        >
          {cells.slice(1).map((cell, i) => {
            const col = columns[i + 1];
            if (!col) return null;

            return (
              <div key={i} className="flex flex-col gap-[2px] ">
                <span className="text-sm font-semibold">{col.label}</span>

                {col.type === "url" ? (
                  (() => {
                    const href = (cell || "").trim();
                    const fallbackText = col.urlFallback?.trim();

                    if (href) {
                      return (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="underline break-all"
                        >
                          {href}
                        </a>
                      );
                    }

                    if (fallbackText) {
                      return <span>{fallbackText}</span>;
                    }

                    return <span>—</span>;
                  })()
                ) : (
                  <span>{cell || "—"}</span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
