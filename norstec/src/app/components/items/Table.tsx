"use client";

import { motion } from "motion/react";
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

export default function Table({ columns, rows }: TableProps) {
    return (
            <table className="w-full border-collapse h-full">
                <thead>
                <tr className="font-medium">
                    {columns.map((column) => (
                        <th
                            key={column.label}
                            className="text-left pb-2 font-semibold italic"
                        >
                            {column.label}
                        </th>
                    ))}
                </tr>
                </thead>

                <motion.tbody
                    variants={bodyVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {rows.map((row, rowIndex) => (
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
                                    const href = cell || column.urlFallback || "";
                                    return (
                                        <td
                                            key={cellIndex}
                                            className="py-2"
                                        >
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
                                                <span>
                                                    —
                                                </span>
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