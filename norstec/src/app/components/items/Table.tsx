"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { SectionTable } from "@/app/types/sections/sectionTable";

type TableProps = {
    columns: SectionTable["columns"];
    rows: SectionTable["rows"];
};

const rowVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
};

const bodyVariants = {
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

type SortDirection = "asc" | "desc";

export default function Table({ columns, rows }: TableProps) {
    const [sortIndex, setSortIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<SortDirection>("asc");

    const handleHeaderClick = (index: number) => {
        if (sortIndex === index) {
            setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortIndex(index);
            setDirection("asc");
        }
    };

    const sortedRows = useMemo(() => {
        if (sortIndex === null) return rows;

        const col = columns[sortIndex];
        if (!col) return rows;

        const sorted = [...rows];

        sorted.sort((a, b) => {
            const aVal = a.cells[sortIndex] ?? "";
            const bVal = b.cells[sortIndex] ?? "";

            // tall-kolonne
            if (col.type === "number") {
                const aNum = Number(aVal);
                const bNum = Number(bVal);

                if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
                    return direction === "asc" ? aNum - bNum : bNum - aNum;
                }

                const aStr = String(aVal);
                const bStr = String(bVal);
                return direction === "asc"
                    ? aStr.localeCompare(bStr)
                    : bStr.localeCompare(aStr);
            }

            // url-kolonne
            if (col.type === "url") {
                const aHref = (aVal || col.urlFallback || "").trim();
                const bHref = (bVal || col.urlFallback || "").trim();
                const aHas = !!aHref;
                const bHas = !!bHref;

                if (aHas !== bHas) {
                    if (direction === "asc") {
                        return aHas ? 1 : -1;
                    } else {
                        return aHas ? -1 : 1;
                    }
                }

                if (!aHas && !bHas) return 0;

                return direction === "asc"
                    ? aHref.localeCompare(bHref)
                    : bHref.localeCompare(aHref);
            }

            // string-kolonne
            const aStr = String(aVal);
            const bStr = String(bVal);
            return direction === "asc"
                ? aStr.localeCompare(bStr)
                : bStr.localeCompare(aStr);
        });

        return sorted;
    }, [rows, columns, sortIndex, direction]);

    return (
        <table className="w-full border-collapse h-full">
            <thead>
            <tr className="font-medium">
                {columns.map((column, index) => {
                    const isActive = sortIndex === index;
                    return (
                        <th
                            key={column.label}
                            className="text-left pb-2 font-semibold italic cursor-pointer select-none"
                            onClick={() => handleHeaderClick(index)}
                        >
                                <span className="inline-flex items-center gap-[2px]">
                                    {column.label}
                                    {isActive && (
                                        <span className="icon icon-20 icon-500">
                                            {direction === "asc"
                                                ? "arrow_upward"
                                                : "arrow_downward"}
                                        </span>
                                    )}
                                </span>
                        </th>
                    );
                })}
            </tr>
            </thead>

            <motion.tbody
                variants={bodyVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {sortedRows.map((row, rowIndex) => (
                    <motion.tr
                        key={rowIndex}
                        variants={rowVariants}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="border-b-2 border-moody"
                    >
                        {row.cells.map((cell, cellIndex) => {
                            const column = columns[cellIndex];
                            if (!column) return null;

                            if (column.type === "url") {
                                const href =
                                    cell || column.urlFallback || "";
                                return (
                                    <td key={cellIndex} className="py-2">
                                        {href ? (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="underline"
                                            >
                                                {href}
                                            </a>
                                        ) : (
                                            <span>—</span>
                                        )}
                                    </td>
                                );
                            }

                            return (
                                <td
                                    key={cellIndex}
                                    className="py-1 pr-3"
                                >
                                    {cell}
                                </td>
                            );
                        })}
                    </motion.tr>
                ))}
            </motion.tbody>
        </table>
    );
}