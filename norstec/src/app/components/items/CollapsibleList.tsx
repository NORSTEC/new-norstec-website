"use client";

import { useEffect, useRef, useState } from "react";
import type { SectionTable } from "@/app/types/sections/sectionTable";

type CollapsibleListProps = {
    columns: SectionTable["columns"];
    rows: SectionTable["rows"];
};

export default function CollapsibleList({ columns, rows }: CollapsibleListProps) {
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

type CollapsibleItemProps = {
    row: SectionTable["rows"][number];
    columns: SectionTable["columns"];
    isLast: boolean;
};

function CollapsibleItem({ row, columns, isLast }: CollapsibleItemProps) {
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open && ref.current) {
            setHeight(ref.current.scrollHeight);
        } else {
            setHeight(0);
        }
    }, [open]);

    const title = row.cells[0] || "—";

    return (
        <div
            className={`border-moody ${
                isLast ? "border-b border-t" : "border-t"
            }`}
        >
            <div
                className="py-[10px] flex justify-between items-center transition-all duration-300 cursor-pointer"
                onClick={() => setOpen(prev => !prev)}
            >
                <div>
                    <h3 className="text-base md:text-lg font-semibold">
                        {title}
                    </h3>
                </div>

                <p className="flex items-center gap-1 text-[0.8rem] md:text-sm text-nowrap">
                     <span
                         className={`icon icon-24 icon-500 transition-transform duration-200 text-moody ${
                             open ? "rotate-90" : "rotate-0"
                         }`}
                     >
                        arrow_right_alt
                    </span>
                </p>
            </div>

            {/* Collapsible innhold */}
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: `${height}px` }}
            >
                <div
                    ref={ref}
                    className=" pb-[24px] pt-[10px] flex flex-col gap-3"
                >
                    {row.cells.slice(1).map((cell, i) => {
                        const col = columns[i + 1];
                        if (!col) return null;

                        return (
                            <div key={i} className="flex flex-col gap-[2px]">
                                <span className="text-sm font-medium opacity-70">
                                    {col.label}
                                </span>

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
                                            return (
                                                <span>
                                                    {fallbackText}
                                                </span>
                                            );
                                        }

                                        return <span>—</span>;
                                    })()
                                ) : (
                                    <span>{cell || "—"}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}