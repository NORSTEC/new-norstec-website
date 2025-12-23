"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { NAV_ITEMS } from "@/config/navigation";
import { usePathname } from "next/navigation";
import HamburgerSpin from "@/components/static/Navbar/HamburgerSpin";
import LogoToggle from "@/components/static/Navbar/LogoToggle";
import NewsletterForm from "@/components/items/newsletter/NewsletterForm";
import { useReducedMotion } from "motion/react";
import {useHideOnScrollMobile} from "../../../../hooks/useHideOnScrollMobile";
import {useMediaQuery} from "../../../../hooks/useMediaQuery";
import Countdown from "@/components/static/Countdown";


type NavbarProps = {
    logoHref?: string;
};

export default function Navbar({ logoHref = "/" }: NavbarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const ENTRY_DELAY_MS = 1100;
    const DESKTOP_TINT_DELAY_MS = 300;
    const [desktopMenuTintOn, setDesktopMenuTintOn] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const is3xl = useMediaQuery("(min-width: 2000px)");
    const shouldDelayOnMount = !isDesktop && pathname === "/" && !prefersReducedMotion;
    const [allowHeader, setAllowHeader] = useState(() => !shouldDelayOnMount);

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

    const headerBg = isDesktop
        ? "transparent"
        : open
            ? "var(--color-moody)"
            : "var(--color-egg)";

    const headerHidden = (!isDesktop && !open && !allowHeader) || (!isDesktop && !mobileHeaderVisible);

    // Lås body-scroll når menyen er åpen
    useEffect(() => {
        if (!open || isDesktop) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [isDesktop, open]);

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

    useEffect(() => {
        if (!shouldDelayOnMount) return;
        const t = window.setTimeout(() => setAllowHeader(true), ENTRY_DELAY_MS);
        return () => window.clearTimeout(t);
    }, [shouldDelayOnMount, ENTRY_DELAY_MS]);

    useEffect(() => {
        if (!isDesktop || is3xl) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDesktopMenuTintOn(false);
            return;
        }

        if (!open) {
            setDesktopMenuTintOn(false);
            return;
        }

        const t = window.setTimeout(() => setDesktopMenuTintOn(true), DESKTOP_TINT_DELAY_MS);
        return () => window.clearTimeout(t);
    }, [open, isDesktop, is3xl, DESKTOP_TINT_DELAY_MS]);


    const toggle = () => setOpen((v) => !v);
    const headerFgIsLight =
        (open && !isDesktop) ||
        (open && isDesktop && desktopMenuTintOn && !is3xl);


    return (
        <>
            {/* TOP BAR */}
            <motion.header
                className="fixed inset-x-0 top-0 z-50 3xl:px-[15rem]"
                initial={false}
                animate={{
                    y: headerHidden ? -72 : 0,
                    backgroundColor: headerBg,
                }}
                transition={{ type: "tween", duration: 0.22, ease: [0.22, 0.9, 0.2, 1] }}
                style={{ willChange: "transform, background-color" }}
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
                                lineClassName={headerFgIsLight ? "bg-egg" : "bg-moody"}
                                className="shrink-0"
                                thickness={2}
                                gap={5}
                            />

                            <span
                                className={[
                                    "hidden lg:inline-block w-[4ch] transition-colors duration-200",
                                    headerFgIsLight ? "text-egg" : "text-moody",
                                ].join(" ")}
                            >
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

                    <div className="absolute inset-0 overflow-x-hidden overflow-y-auto md:bg-transparent overscroll-contain">
                        {isDesktop ? (
                            <>
                                <motion.div
                                    className="absolute left-0 top-0 h-screen pl-[67vw] 3xl:pl-[40vw] w-[100vw] 3xl:w-[64vw] bg-[#3D5B81] pt-20 text-egg"
                                    variants={panelBackVariants}
                                    transition={{
                                        type: "tween",
                                        ease: [0.22, 0.9, 0.2, 1],
                                        duration: 0.55,
                                        delay: open ? 0.12 : 0,
                                    }}
                                    style={{ willChange: "transform", transform: "translateZ(0)" }}
                                >
                                    <div className="px-5 lg:px-8 flex flex-col gap-3">
                                        <h2 className="text-h2 font-light">summit</h2>
                                        <p className="font-normal text-[1.25rem]! 2xl:text-[1.5rem]! italic">Securing our future in space.</p>
                                        <Countdown
                                            targetDate={new Date(2026, 3, 12, 0, 0, 0)}
                                        />
                                    </div>
                                </motion.div>

                                {/* BAK (lyseblå) */}
                                <motion.div
                                    className="absolute left-0 top-0 h-screen pl-[33vw] 3xl:pl-[16vw] w-[67vw] 3xl:w-[40vw] bg-[#98C0D9] pt-20"
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
                                    className="absolute left-0 top-0 h-screen w-[33vw] 3xl:w-[16vw] 3xl:min-w-[20rem] bg-moody"
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
                                className="absolute left-0 top-0 px-5 min-h-[100vh] w-[100vw] bg-moody overscroll-y-auto space-y-10"
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
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col pt-20 lg:px-8">
            <nav className="space-y-5">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={[
                                "nav-item text-h2",
                                isActive ? "nav-item--active" : "",
                            ].join(" ")}
                        >
                            <span className="order-1">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

