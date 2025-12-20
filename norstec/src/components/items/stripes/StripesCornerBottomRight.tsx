"use client";

import React from "react";
import { motion } from "motion/react";

type StripesCornerBottomRightProps = {
    className?: string;

    /** Størrelse på hele “hjørneformen” */
    size?: number; // px
    /** Tykkelse på hver stripe */
    strokeWidth?: number; // px
    /** Mellomrom mellom stripene */
    gap?: number; // px

    /** Offset fra høyre/bunn */
    offsetX?: number; // px
    offsetY?: number; // px

    /** Animasjon */
    stripeDelay?: number;
    duration?: number;
    startDelay?: number;
};

const COLORS = ["#1697B7", "#30C3CD", "#F3AD78", "#E8804C"];

function ArcStripe({
                       r,
                       color,
                       show,
                       delay,
                       duration,
                       strokeWidth,
                   }: {
    r: number;
    color: string;
    show: boolean;
    delay: number;
    duration: number;
    strokeWidth: number;
}) {
    const S = 1000;

    const startX = S;
    const startY = S - r;
    const endX = S - r;
    const endY = S;

    const d = `M ${startX} ${startY} A ${r} ${r} 0 0 0 ${endX} ${endY}`;

    return (
        <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: show ? 1 : 0 }}
            transition={{ delay, duration, ease: "easeOut" }}
        />
    );
}

export default function StripesCornerBottomRight({
                                                     className = "",
                                                     size = 500,
                                                     strokeWidth = 72,
                                                     gap = 40,
                                                     offsetX = -26,
                                                     offsetY = 0,
                                                     stripeDelay = 0.1,
                                                     duration = 0.45,
                                                     startDelay = 0,
                                                 }: StripesCornerBottomRightProps) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        const el = rootRef.current;
        if (!el) return;

        const target =
            el.closest("section") || el.closest(".section") || el.parentElement;

        if (!target) {
            if (startDelay > 0) {
                setTimeout(() => setShow(true), startDelay * 1000);
            } else {
                setShow(true);
            }
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (startDelay > 0) {
                        setTimeout(() => setShow(true), startDelay * 1000);
                    } else {
                        setShow(true);
                    }
                    io.disconnect();
                }
            },
            { threshold: 0.5, rootMargin: "0px 0px -10% 0px" }
        );

        io.observe(target);
        return () => io.disconnect();
    }, [startDelay]);


    const baseR = 650;
    const step = strokeWidth + gap;

    return (
        <div
            ref={rootRef}
            aria-hidden="true"
            className={`hidden lg:block absolute right-0 bottom-0 pointer-events-none -z-10 ${className}`}
            style={{
                width: size,
                height: size,
                transform: `translate(${-offsetX}px, ${-offsetY}px)`,
            }}
        >
            <svg viewBox="0 0 1000 1000" width="100%" height="100%">
                {COLORS.map((c, i) => (
                    <ArcStripe
                        key={c}
                        r={baseR - i * step}
                        color={c}
                        show={show}
                        delay={i * stripeDelay}
                        duration={duration}
                        strokeWidth={strokeWidth}
                    />
                ))}
            </svg>
        </div>
    );
}
