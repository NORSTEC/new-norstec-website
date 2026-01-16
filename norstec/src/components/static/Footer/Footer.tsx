'use client';

import FooterNewsletterForm from "@/components/items/newsletter/FooterNewsletterForm";
import { CREDITS } from "@/config/credits";
import { NAV_ITEMS } from "@/config/navigation";
import { SOCIAL_MEDIA } from "@/config/socialMedia";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Footer() {
    useEffect(() => {
        document.body.classList.add("snap-page");
        return () => document.body.classList.remove("snap-page");
    }, []);

    const year = new Date().getFullYear();

    const pathname = usePathname();

    const isActiveRoute = (pathname: string, href: string) => {
        if (href === "/") return pathname === "/"
        return pathname === href || pathname.startsWith(`${href}/`)
    }

    return (
      <footer id="footer" className="py-20 md:py-40 lg:py-0">
        <div className="snap-start section w-full bg-moody text-egg flex flex-col items-center py-12 p-4 md:p-12 xl:p-24 gap-24 lg:gap-0 justify-between">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 w-full">
            {/* Left Column */}
            <div className="w-full flex flex-col gap-8 md:gap-24">
              <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl font-semibold italic">
                Keep yourself updated with spacepodden, or sign up for our newsletter.
              </h1>
              <FooterNewsletterForm />
            </div>

            {/* Right Column */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-0 md:justify-items-end">
              {/* Contact */}
              <div className="col-span-2 md:col-span-1 flex flex-col">
                <h1 className="font-semibold italic mb-8 md:mb-12">Contact Us</h1>
                <a href="tel:+4798655256">+47 986 55 256</a>
                <a href="mailto:contact@norstec.no" className="mb-4 md:mb-8">
                  contact@norstec.no
                </a>
                <p className="mb-4 md:mb-8">Br.reg: 933 031 152</p>

                {CREDITS.map((item) => (
                  <p key={item.href}>
                    <a href={item.href} className="hover:underline">
                      {item.name} - {item.accreditation}
                    </a>
                  </p>
                ))}

                <p className="mt-4 md:mt-8">© {year} Norstec</p>
              </div>

              {/* Social Media */}
              <div className="flex flex-col">
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
                        "group flex flex-row gap-2",
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
          <section className="grid gap-24 grid-cols-1 md:grid-cols-2 w-full">
            {/* Left Column */}
            <div className="w-full md:w-2/3 flex flex-col justify-between">
              <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl font-semibold italic">
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
                className="object-contain w-64 md:w-48 lg:w-56 xl:w-64 h-auto"
              />
            </div>
          </section>
        </div>
      </footer>
    );
}

