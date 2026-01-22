'use client';

import FooterNewsletterForm from "@/components/items/newsletter/FooterNewsletterForm";
import { CREDITS } from "@/config/credits";
import { NAV_ITEMS } from "@/config/navigation";
import { SOCIAL_MEDIA } from "@/config/socialMedia";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { CSSProperties } from "react";
import { useTheme } from "@/hooks/useTheme";

type FooterProps = {
  backgroundColor?: string;
  logoStyle?: CSSProperties;
};

export default function Footer({ backgroundColor, logoStyle }: FooterProps) {
    useEffect(() => {
        document.body.classList.add("snap-page");
        return () => document.body.classList.remove("snap-page");
    }, []);

    const year = new Date().getFullYear();

    const pathname = usePathname();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const isSummit = pathname?.startsWith("/summit");

  const isActiveRoute = (pathname: string, href: string) => {
        if (href === "/") return pathname === "/"
        return pathname === href || pathname.startsWith(`${href}/`)
    }

    const logoTintStyle: CSSProperties | undefined =
      isSummit
        ? undefined
        : isDark
          ? {
              filter:
                "brightness(0) saturate(100%) invert(90%) sepia(10%) saturate(478%) hue-rotate(351deg) brightness(103%) contrast(95%)",
            }
          : undefined;
    const mergedLogoStyle = { ...logoStyle, ...(logoTintStyle ?? {}) };

    return (
      <footer id="footer" className="pt-20 md:pt-40 lg:py-0">
        <div
          className={[
            "snap-start section w-full flex flex-col items-center desktop-container justify-between",
            isSummit ? "text-moody-static" : isDark ? "text-egg-static" : "text-egg",
          ].join(" ")}
          style={backgroundColor ? { backgroundColor } : isDark ? { backgroundColor: "#3D5B81" } : { backgroundColor: "#0f1118" }}
        >
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 w-full">
            {/* Left Column */}
            <div className="w-full flex flex-col gap-8 md:gap-24">
              <h1 className="text-[1.35rem] md:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.5rem] font-light italic">
                Keep yourself updated with spacepodden, or sign up for our newsletter.
              </h1>
              <FooterNewsletterForm />
            </div>

            {/* Right Column */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-0 lg:justify-items-end">
              {/* Contact */}
              <div className="col-span-2 md:col-span-1 flex flex-col">
                <h1 className="font-semibold italic mb-8 md:mb-12">Contact Us</h1>
                <a href="tel:+4798655256" className="hover:underline">
                  +47 986 55 256
                </a>
                <a href="mailto:contact@norstec.no" className="mb-4 md:mb-8 hover:underline">
                  contact@norstec.no
                </a>
                <p className="mb-4 md:mb-8">Br.reg: 933 031 152</p>

                <p className=" italic">{CREDITS[0]?.accreditation}</p>

                <div className="flex flex-col gap-1">
                  {CREDITS.map((item) =>
                    item.href ? (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <p key={item.name}>{item.name}</p>
                    )
                  )}
                </div>

                <p className="mt-4 md:mt-8">© {year} Norstec</p>
              </div>

              {/* Social Media */}
              <div className="flex flex-col space-y-1">
                <h1 className="font-semibold italic mb-8 md:mb-12">Social Media</h1>
                {SOCIAL_MEDIA.map((item) => (
                  <a key={item.href} href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex flex-col">
                <h1 className="font-semibold italic mb-8 md:mb-12">Navigation</h1>
                {NAV_ITEMS.map((item) => {
                  const isActive = isActiveRoute(pathname, item.href);

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={[
                        "group flex flex-row gap-2 pt-1",
                        isActive ? "italic text-copper" : "",
                        item.variant === "summit" ? "text-sky" : "",
                      ].join(" ")}
                    >
                      {item.label}
                      <Image
                        src={
                          item.variant === "summit"
                            ? "/images/star-sky.png"
                            : "/images/star-orange.svg"
                        }
                        alt="NORSTEC star"
                        width={16}
                        height={16}
                        className={[
                          "object-contain transition-opacity duration-200",
                          !isActive && "opacity-0 group-hover:opacity-100",
                        ].join(" ")}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="grid gap-24 grid-cols-1 md:grid-cols-2 w-full pt-12 xl:pt-0">
            {/* Left Column */}
            <div className="w-full md:w-2/3 flex flex-col justify-between">
              <h1 className="text-[1.35rem] md:text-[1.75rem] xl:text-[2rem] 2xl:text-[2.5rem] font-light italic">
                The Norwegian Space Technology Collective.
              </h1>
            </div>
            {/* Right Column */}
            <div className="w-full flex md:justify-end justify-center items-center">
              <Image
                src="/images/NORSTECVECTOR.svg"
                alt="Norstec Logo"
                width={264}
                height={264}
                className="object-contain w-64 md:w-32 lg:w-48 xl:w-56 h-auto"
                style={mergedLogoStyle}
              />
            </div>
          </section>
        </div>
      </footer>
    );
}
