"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "@/config/navigation";
import { usePathname } from "next/navigation";
import HamburgerSpin from "@/components/static/Navbar/HamburgerSpin";
import LogoToggle from "@/components/static/Navbar/LogoToggle";
import NewsletterForm from "@/components/items/newsletter/NewsletterForm";

type NavbarProps = {
    logoHref?: string;
};

function useIsDesktop(breakpointPx = 768) {
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
    const isDesktop = useIsDesktop(768);
    const pathname = usePathname();

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
            <header className="fixed inset-x-0 top-0 z-50 bg-egg md:bg-transparent">
                <div className="mx-auto w-full px-5 lg:px-8">
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
            </header>


            <AnimatePresence>
                {open && (
                    <motion.aside
                        id="site-menu"
                        className="fixed inset-0 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <button
                            type="button"
                            className="absolute inset-0 cursor-default"
                            onClick={() => setOpen(false)}
                            aria-label="Close menu backdrop"
                        />

                        <div className="absolute inset-0 overflow-hidden">
                            {/* DESKTOP: 2 layers fra VENSTRE */}
                            {isDesktop ? (
                                <>
                                    <motion.div
                                        className="absolute left-0 top-0 h-screen pl-[30vw] w-[70vw] bg-[#98C0D9] shadow-2xl pt-20"
                                        initial={{ x: "-110%" }}
                                        animate={{ x: "0%" }}
                                        exit={{ x: "-110%" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 32,
                                            mass: 0.9,
                                            delay: 0.06,
                                        }}
                                        style={{
                                            filter: "none",
                                        }}>
                                        <div className="px-5 lg:px-8">
                                            <NewsletterForm />
                                        </div>
                                    </motion.div>
                                    {/* Layer 1 (foran): mørk */}
                                    <motion.div
                                        className="absolute left-0 top-0 h-screen w-[30vw] bg-moody"
                                        initial={{ x: "-110%" }}
                                        animate={{ x: "0%" }}
                                        exit={{ x: "-110%" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 280,
                                            damping: 30,
                                            mass: 0.9,
                                        }}
                                    >

                                        <MenuContent onNavigate={() => setOpen(false)} />
                                    </motion.div>
                                </>
                            ) : (
                                /* MOBIL: kun layer 1 fra VENSTRE */
                                <motion.div
                                    className="absolute left-0 top-0 h-screen w-[75vw] bg-moody overflow-y-scroll"
                                    initial={{ x: "-110%" }}
                                    animate={{ x: "0%" }}
                                    exit={{ x: "-110%" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 280,
                                        damping: 30,
                                        mass: 0.9,
                                    }}
                                >
                                    <MenuContent onNavigate={() => setOpen(false)} />
                                    <NewsletterForm />
                                </motion.div>
                            )}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}

function MenuContent({ onNavigate }: { onNavigate: () => void }) {
    return (
        <div className="flex h-full flex-col pt-20 px-5 lg:px-8">
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
