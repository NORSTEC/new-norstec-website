"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/config/navigation";
import { usePathname } from "next/navigation";
import HamburgerSpin from "@/components/static/Navbar/HamburgerSpin";
import LogoToggle from "@/components/static/Navbar/LogoToggle";
import NewsletterForm from "@/components/items/newsletter/NewsletterForm";
import {useHideOnScrollMobile} from "@/utils/useHideOnScrollMobile";

type NavbarProps = {
    logoHref?: string;
};

function useIsDesktop(breakpointPx = 1024) {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(`(min-width: ${breakpointPx}px)`);
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [breakpointPx]);

    return isDesktop;
}

export default function Navbar({ logoHref = "/" }: NavbarProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useIsDesktop(1024);
    const pathname = usePathname();
    const overlayVariants = {
        open: { opacity: 1, pointerEvents: "auto" as const },
        closed: { opacity: 0, pointerEvents: "none" as const },
    };

    const panelBackVariants = {
        open: { x: 0 },
        closed: { x: "-110%" },
    };

    const panelFrontVariants = {
        open: { x: 0 },
        closed: { x: "-110%" },
    };

    const mobileHeaderVisible = useHideOnScrollMobile({
        enabled: !isDesktop && !open,
        hideAfterPx: 1,
        hideDeltaPx: 400,
        showDeltaPx: 10,
        topSafePx: 8,
    });
    // Lås body-scroll når menyen er åpen
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    const toggle = () => setOpen((v) => !v);

    return (
        <>
            {/* TOP BAR */}
            <motion.header
                className="fixed inset-x-0 top-0 z-50 bg-egg lg:bg-transparent 3xl:px-[15rem] overflow-y-scroll"
                animate={{
                    y: !isDesktop && !mobileHeaderVisible ? -72 : 0,
                }}
                transition={{ type: "tween", duration: 0.22, ease: [0.22, 0.9, 0.2, 1] }}
                style={{ willChange: "transform" }}
            >
                <div className="mx-auto w-full px-5 lg:px-8 max-w-[2000px]">
                    <div className="flex h-16 items-center justify-between">
                        <Link href={logoHref} className="inline-flex items-center" aria-label="Go to homepage">
                            <LogoToggle open={open} />
                        </Link>
                        <button
                            type="button"
                            onClick={toggle}
                            className="inline-flex items-center gap-3 cursor-pointer"
                            aria-expanded={open}
                            aria-controls="site-menu"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            <HamburgerSpin
                                open={open}
                                lineClassName="bg-moody"
                                className="shrink-0"
                                thickness={2}
                                gap={5}
                            />

                            <span className="hidden lg:inline-block w-[4ch]">
                                {open ? "CLOSE" : "MENU"}
                              </span>
                        </button>

                    </div>
                </div>
            </motion.header>


                <motion.aside
                    id="site-menu"
                    className="fixed inset-0 z-40"
                    initial={false}
                    animate={open ? "open" : "closed"}
                    variants={overlayVariants}
                    transition={{ duration: 0.2 }}
                >
                    <button
                        type="button"
                        className="absolute inset-0 cursor-default"
                        onClick={() => setOpen(false)}
                        aria-label="Close menu backdrop"
                    />

                    <div className="absolute inset-0 overflow-hidden">
                        {isDesktop ? (
                            <>
                                {/* BAK (lyseblå) */}
                                <motion.div
                                    className="absolute left-0 top-0 h-screen pl-[30vw] 3xl:pl-[15vw] w-[70vw] 3xl:w-[50vw] bg-[#98C0D9] pt-20"
                                    variants={panelBackVariants}
                                    transition={{
                                        type: "tween",
                                        ease: [0.22, 0.9, 0.2, 1],
                                        duration: 0.55,
                                        delay: open ? 0.06 : 0,
                                    }}
                                    style={{ willChange: "transform", transform: "translateZ(0)" }}
                                >
                                    <div className="px-5 lg:px-8">
                                        <NewsletterForm tone="light" />
                                    </div>
                                </motion.div>

                                {/* FORAN (mørk) */}
                                <motion.div
                                    className="absolute left-0 top-0 h-screen w-[30vw] 3xl:w-[15vw] 3xl:min-w-[20rem] bg-moody"
                                    variants={panelFrontVariants}
                                    transition={{
                                        type: "spring",
                                        stiffness: 280,
                                        damping: 30,
                                        mass: 0.9,
                                    }}
                                    style={{ willChange: "transform", transform: "translateZ(0)" }}
                                >
                                    <MenuContent onNavigate={() => setOpen(false)} />
                                </motion.div>
                            </>
                        ) : (
                            <motion.div
                                className="absolute left-0 top-0 min-h-screen px-5 w-[80vw] bg-moody overflow-y-auto space-y-16"
                                variants={panelFrontVariants}
                                transition={{
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 30,
                                    mass: 0.9,
                                }}
                                style={{ willChange: "transform", transform: "translateZ(0)" }}
                            >
                                <MenuContent onNavigate={() => setOpen(false)} />
                                <NewsletterForm tone="dark" onNavigate={() => setOpen(false)} />
                            </motion.div>
                        )}
                    </div>
                </motion.aside>

        </>
    );
}

function MenuContent({ onNavigate }: { onNavigate: () => void }) {
    return (
        <div className="flex h-full flex-col pt-20 lg:px-8 ">
            <nav className="space-y-5">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className="block text-h2 text-egg transition-colors font-light"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
