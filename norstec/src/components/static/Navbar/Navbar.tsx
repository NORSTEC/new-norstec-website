"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { NAV_ITEMS } from "@/config/navigation";
import { usePathname } from "next/navigation";
import HamburgerSpin from "@/components/static/Navbar/HamburgerSpin";
import LogoToggle from "@/components/static/Navbar/LogoToggle";
import NewsletterForm from "@/components/items/newsletter/NewsletterForm";
import { useReducedMotion } from "motion/react";
import { useHideOnScrollMobile } from "@/hooks/useHideOnScrollMobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Countdown from "@/components/static/Countdown";
import { useTheme } from "@/hooks/useTheme";

type NavbarProps = {
  logoHref?: string;
};

export default function Navbar({ logoHref = "/" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [heroInView, setHeroInView] = useState(false);
  const heroVisibilityRef = useRef(false);

  const pathname = usePathname() ?? "/";
  const prefersReducedMotion = useReducedMotion();
  const ENTRY_DELAY_MS = 1100;
  const DESKTOP_TINT_DELAY_MS = 300;
  const [desktopMenuTintOn, setDesktopMenuTintOn] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const is3xl = useMediaQuery("(min-width: 2000px)");
  const forceDark = pathname?.startsWith("/summit");
  const shouldDelayOnMount = !isDesktop && pathname === "/" && !prefersReducedMotion;
  const [allowHeader, setAllowHeader] = useState(() => !shouldDelayOnMount);
  const { resolvedTheme, toggleTheme } = useTheme();
  const themeIcon = resolvedTheme === "dark" ? "dark_mode" : "light_mode";

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

  const headerHidden =
    (!isDesktop && !open && !allowHeader) || (!isDesktop && !mobileHeaderVisible);

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
    const handleScroll = () => {
      if (!isDesktop) {
        setFooterInView(false);
        return;
      }

      const footer = document.getElementById("footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();

      const atTop = rect.top <= 72;

      setFooterInView(atTop);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

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

  useEffect(() => {
    const heroes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-hero]")
    );

    if (!heroes.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeroInView(false);
      return;
    }

    let latest = heroVisibilityRef.current;
    const enterThreshold = isDesktop ? 0.35 : 0.05;
    const exitThreshold = isDesktop ? 0.25 : 0.15;

    const computeHeroVisibility = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      return heroes.some((hero) => {
        const rect = hero.getBoundingClientRect();
        const visibleHeight =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const ratio = visibleHeight / Math.min(rect.height || viewportHeight, viewportHeight);
        const threshold = latest ? exitThreshold : enterThreshold;
        return ratio >= threshold;
      });
    };

    const updateHeroInView = () => {
      const next = computeHeroVisibility();
      latest = next;
      heroVisibilityRef.current = next;
      setHeroInView(next);
    };

    const observer = new IntersectionObserver(updateHeroInView, {
      threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
    });

    heroes.forEach((hero) => observer.observe(hero));
    updateHeroInView();

    return () => observer.disconnect();
  }, [pathname, isDesktop]);

  useEffect(() => {
    heroVisibilityRef.current = heroInView;
  }, [heroInView]);

  const toggle = () => setOpen((v) => !v);
  const headerFgIsLight =
    (open && !isDesktop) || (open && isDesktop && desktopMenuTintOn && !is3xl);
  const heroForcesDarkNav = heroInView;
  const navTheme = heroForcesDarkNav ? "dark" : resolvedTheme;
  const controlsLight = navTheme === "dark" ? true : headerFgIsLight;
  const lineTransitionClass = "transition-colors duration-200 lg:duration-300";
  const mobileHeaderBg =
    heroForcesDarkNav && !open
      ? "rgba(15,17,24,0)"
      : navTheme === "dark" || open
        ? "#0f1118"
        : "#EDE8DA";
  const headerBg = isDesktop ? "transparent" : mobileHeaderBg;

  return (
    <>
      {/* TOP BAR */}
      <motion.header
        className={["fixed inset-x-0 top-0 z-50", footerInView && "hidden"].join(" ")}
        initial={false}
        animate={{
          y: headerHidden ? -72 : 0,
          backgroundColor: headerBg,
        }}
        transition={{ type: "tween", duration: 0.35, ease: [0.22, 0.9, 0.2, 1] }}
        style={{ willChange: "transform, background-color" }}
      >
        <div className="mx-auto w-full px-5 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={logoHref} className="inline-flex items-center" aria-label="Go to homepage">
              <LogoToggle open={open} forceDark={navTheme === "dark"} />
            </Link>
            <div className="flex items-center gap-3">
              {!forceDark && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={[
                    "h-8 w-8 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 lg:duration-300",
                    navTheme === "dark"
                      ? "border-egg-static text-egg-static"
                      : controlsLight
                        ? "border-egg text-egg"
                        : "border-moody text-moody",
                  ].join(" ")}
                  aria-label="Toggle color theme"
                >
                  <span className="icon icon-24">{themeIcon}</span>
                </button>
              )}
              <button
                type="button"
                onClick={toggle}
                className="inline-flex items-center gap-3 cursor-pointer transition-colors duration-200 lg:duration-300"
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <HamburgerSpin
                  open={open}
                  lineClassName={[
                    lineTransitionClass,
                    navTheme === "dark"
                      ? "bg-egg-static"
                      : controlsLight
                        ? "bg-egg"
                        : "bg-moody",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  lineClassNameActive={
                    navTheme === "dark"
                      ? [lineTransitionClass, "bg-egg-static"].filter(Boolean).join(" ")
                      : undefined
                  }
                  className="shrink-0"
                  thickness={2}
                  gap={5}
                />

                <span
                  className={[
                    "hidden lg:inline-block w-[4ch] transition-colors duration-200 lg:duration-300",
                    navTheme === "dark"
                      ? "text-egg-static"
                      : controlsLight
                        ? "text-egg"
                        : "text-moody",
                  ].join(" ")}
                >
                  {open ? "CLOSE" : "MENU"}
                </span>
              </button>
            </div>
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
                <div className="px-5 lg:px-8 flex flex-col gap-3 text-egg-static">
                  <h2 className="text-h2 font-light">summit</h2>
                  <p className="font-normal text-[1.25rem]! 2xl:text-[1.5rem]! italic">
                    Securing our future in space.
                  </p>
                  <Countdown targetDate={new Date(2026, 2, 12, 0, 0, 0)} />
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
                className="absolute left-0 top-0 h-screen w-[33vw] 3xl:w-[16vw] 3xl:min-w-[20rem] bg-[#0f1118]"
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
              className="absolute left-0 top-0 px-5 min-h-[100vh] w-[100vw] bg-[#0f1118] overscroll-y-auto space-y-10"
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
          const colorClass = item.variant === "summit"
            ? "text-sky"
            : isActive
              ? "text-copper"
              : "text-egg-static";

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={[
                "nav-item text-h2",
                colorClass,
                item.variant === "summit" ? "nav-item--summit" : "",
                isActive ? "nav-item--active" : "",
                isActive && item.variant === "summit" ? "nav-item--summit-active" : "",
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
