"use client";
import React from "react";
import { motion } from "motion/react";

const MASK_COLOR = "#E9E3D7";
const STRIPE_DELAY = 0.1;
const DURATION = 0.5;

function Line({ className, color }: { className: string; color: string }) {
    return (
        <div
            className={className}
            style={{
                width: "var(--trap-width)",
                height: "300%",
                background: color,
                clipPath:
                    "polygon(0% 0%, calc(100% - var(--trap-cut)) 0%, 100% 100%, 0% 100%)",
                WebkitClipPath:
                    "polygon(0% 0%, calc(100% - var(--trap-cut)) 0%, 100% 100%, 0% 100%)",
            }}
        />
    );
}

function RevealMask({ show, delay }: { show: boolean; delay: number }) {
    return (
        <motion.div
            className="absolute inset-0"
            style={{ background: MASK_COLOR, zIndex: 999 }}
            initial={{ y: "0%" }}
            animate={{ y: show ? "100%" : "0%" }}
            transition={{ delay, duration: DURATION, ease: "easeOut" }}
        />
    );
}

export default function Chemtrails() {
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

    return (
        <div
            ref={rootRef}
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        >
            <div className="relative h-full w-full translate-x-[3rem] lg:translate-x-[5rem] xl:translate-x-[7rem] 3xl:translate-x-[15rem]">
                {/* Stripe 1 */}
                <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 40 }}>
                    <div
                        className="absolute inset-0 [--rot:0deg] xl:[--rot:0deg] 3xl:[--rot:-2deg]"
                        style={{
                            transform: "translate(0px, 0px) rotate(var(--rot))",
                            transformOrigin: "top left",
                        }}
                    >
                        <Line
                            color="#1697B7"
                            className="[--trap-width:260px] [--trap-cut:230px] xl:[--trap-width:510px] xl:[--trap-cut:474px] 3xl:[--trap-width:400px] 3xl:[--trap-cut:364px]"
                        />
                    </div>
                    <RevealMask show={show} delay={0} />
                </div>

                {/* Stripe 2 */}
                <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 30 }}>
                    <div
                        className="absolute inset-0 [--rot:-13deg] xl:[--rot:-11deg] 3xl:[--rot:-10deg]"
                        style={{
                            transform: "translate(3.55rem, 0px) rotate(var(--rot))",
                            transformOrigin: "top left",
                        }}
                    >
                        <Line
                            color="#30C3CD"
                            className="[--trap-width:220px] [--trap-cut:180px] xl:[--trap-width:643px] xl:[--trap-cut:610px] 3xl:[--trap-width:303px] 3xl:[--trap-cut:270px]"
                        />
                    </div>
                    <RevealMask show={show} delay={STRIPE_DELAY} />
                </div>

                {/* Stripe 3 */}
                <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 20 }}>
                    <div
                        className="absolute inset-0 [--rot:-26deg] xl:[--rot:-25deg] 3xl:[--rot:-22deg]"
                        style={{
                            transform: "translate(7.10rem, 0px) rotate(var(--rot))",
                            transformOrigin: "top left",
                        }}
                    >
                        <Line
                            color="#F5B27A"
                            className="[--trap-width:240px] [--trap-cut:200px] xl:[--trap-width:660px] xl:[--trap-cut:632px] 3xl:[--trap-width:290px] 3xl:[--trap-cut:260px]"
                        />
                    </div>
                    <RevealMask show={show} delay={2 * STRIPE_DELAY} />
                </div>

                {/* Stripe 4 */}
                <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 10 }}>
                    <div
                        className="absolute inset-0 [--rot:-39deg] xl:[--rot:-40deg] 3xl:[--rot:-36deg]"
                        style={{
                            transform: "translate(10.65rem, 0px) rotate(var(--rot))",
                            transformOrigin: "top left",
                        }}
                    >
                        <Line
                            color="#E8834D"
                            className="[--trap-width:360px] [--trap-cut:320px] xl:[--trap-width:483px] xl:[--trap-cut:460px] 3xl:[--trap-width:660px] 3xl:[--trap-cut:580px]"
                        />
                    </div>
                    <RevealMask show={show} delay={3 * STRIPE_DELAY} />
                </div>
            </div>
        </div>
    );
}
