"use client";

import React from "react";
import { motion } from "motion/react";

type StripesVerticalProps = {
    className?: string;
    side?: "left" | "right";
};

const COLORS = ["bg-sky", "bg-beachball", "bg-sun", "bg-copper"];

export default function StripesVertical({
                                            className = "",
                                            side = "left",
                                        }: StripesVerticalProps) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const target =
            el.closest("section") || el.closest(".section") || el.parentElement;

        if (!target) {
            setShow(true);
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShow(true);
                    io.disconnect();
                }
            },
            { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
        );

        io.observe(target);
        return () => io.disconnect();
    }, []);

    const padding =
        side === "left"
            ? "pl-[1rem] md:pl-[3rem] lg:pl-[5rem] xl:pl-[7rem] 3xl:pl-[15rem]"
            : "pr-[1rem] md:pr-[3rem] lg:pr-[5rem] xl:pr-[7rem] 3xl:pr-[15rem]";

    const containerClass =
        `flex absolute inset-y-0 px-[20px] -z-10 h-full ` +
        `gap-[0.5rem] md:gap-[1rem] xl:gap-[1.3rem] 3xl:gap-[2rem] ` +
        `${padding} ${side === "left" ? "left-0" : "right-0"} ${className}`;

    const n = COLORS.length;

    return (
        <div ref={rootRef} className={containerClass} aria-hidden="true">
            {COLORS.map((color, i) => {
                // Viktig: IKKE flip farger — bare flip delay-rekkefølgen ved side="right"
                const delayIndex = side === "right" ? n - 1 - i : i;

                return (
                    <motion.span
                        key={`${side}-${i}`}
                        className={`h-full w-[.5rem] md:w-[2rem] xl:w-[2.25rem] 3xl:w-[2.5rem]  origin-top ${color}`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: show ? 1 : 0 }}
                        transition={{
                            delay: delayIndex * 0.1,
                            duration: 0.35,
                            ease: "easeOut",
                        }}
                    />
                );
            })}
        </div>
    );
}
