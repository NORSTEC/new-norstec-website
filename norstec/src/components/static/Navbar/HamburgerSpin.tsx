"use client";

import { motion } from "motion/react";

type HamburgerSpinProps = {
    open: boolean;
    className?: string;
    lineClassName?: string;

    lineWidth?: number;   // px
    thickness?: number;   // px
    gap?: number;         // px
};

export default function HamburgerSpin({
                                          open,
                                          className,
                                          lineClassName,
                                          lineWidth = 28,
                                          thickness = 2,
                                          gap = 7,
                                      }: HamburgerSpinProps) {
    const width = lineWidth;
    const height = thickness * 3 + gap * 2;

    const yTop = 0;
    const yMid = thickness + gap;
    const yBot = (thickness + gap) * 2;

    const commonLine = [
        "absolute left-0",
        lineClassName ?? "",
    ].join(" ");

    return (
        <span
            className={["relative inline-block", className ?? ""].join(" ")}
            style={{ width, height }}
            aria-hidden="true"
        >
      {/* Spin wrapper */}
            <motion.span
                className="absolute inset-0"
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
            >
        {/* Top */}
                <motion.span
                    className={commonLine}
                    style={{ width: lineWidth, height: thickness, top: yTop }}
                    animate={{
                        top: open ? yMid : yTop,
                        rotate: open ? 45 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
                />

                {/* Mid */}
                <motion.span
                    className={commonLine}
                    style={{ width: lineWidth, height: thickness, top: yMid }}
                    animate={{ opacity: open ? 0 : 1 }}
                    transition={{ duration: 0.12 }}
                />

                {/* Bottom */}
                <motion.span
                    className={commonLine}
                    style={{ width: lineWidth, height: thickness, top: yBot }}
                    animate={{
                        top: open ? yMid : yBot,
                        rotate: open ? -45 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 520, damping: 38, mass: 0.6 }}
                />
      </motion.span>
    </span>
    );
}
