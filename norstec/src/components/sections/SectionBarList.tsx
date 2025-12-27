"use client";

import React from "react";
import { motion } from "motion/react";
import { PortableText } from "next-sanity";
import type { SectionBarList as SectionBarListType } from "@/types/sections/sectionBarList";

type SectionBarListProps = {
  section: SectionBarListType;
};

const BAR_BG = ["bg-copper", "bg-sun", "bg-beachball", "bg-sky"] as const;
const TEXT_COLOR = ["text-copper", "text-sun", "text-beachball", "text-sky"] as const;
const BAR_WIDTHS = ["18%", "36%", "54%", "72%"] as const;

export default function SectionBarList({ section }: SectionBarListProps) {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} className="section h-full">
      <div className="h-full w-full flex flex-col">
        {section.title && (
          <div className="mobile-container pb-0!">
            <h2 className="text-h1 font-normal hidden lg:block">{section.title}</h2>
            <h2 className="text-h2 block lg:hidden">
              {section.title}
              <span aria-hidden className="star-inline" />
            </h2>
          </div>
        )}

        {/* Mobil */}
        <div className="lg:hidden relative flex-1 mobile-container pt-5! ">
          <div className="flex flex-col gap-10">
            {section.items.map((item, index) => {
              const bg = BAR_BG[index % BAR_BG.length];
              const text = TEXT_COLOR[index % TEXT_COLOR.length];

              const delay = index * 0.22;
              const barDuration = 0.5;

              return (
                <div key={item._id} className="flex items-stretch">
                  {/* Stripe */}
                  <div className="w-3 shrink-0 self-stretch">
                    <motion.div
                      className={`${bg} h-full w-full`}
                      style={{ transformOrigin: "top" }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: show ? 1 : 0 }}
                      transition={{
                        duration: barDuration,
                        ease: "easeOut",
                        delay,
                      }}
                    />
                  </div>

                  <motion.div
                    className="overflow-hidden pl-5"
                    initial={{
                      opacity: 0,
                      x: -8,
                      clipPath: "inset(0 100% 0 0)",
                    }}
                    animate={{
                      opacity: show ? 1 : 0,
                      x: show ? 0 : -8,
                      clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    }}
                    transition={{
                      delay: delay + barDuration * 0.75,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                  >
                    <div className="flex flex-col">
                      <span className={`${text} text-h2 leading-tight`}>{item.value}</span>

                      {item.caption && (
                        <div className="mt-2">
                          <PortableText
                            value={item.caption as never}
                            components={{
                              block: {
                                normal: ({ children }) => <p>{children}</p>,
                              },
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop*/}
        <div className="hidden lg:block">
          <div className="flex flex-col gap-5">
            {section.items.map((item, index) => {
              const bg = BAR_BG[index % BAR_BG.length];
              const text = TEXT_COLOR[index % TEXT_COLOR.length];
              const width = BAR_WIDTHS[index % BAR_WIDTHS.length];

              const delay = index * 0.22;
              const barDuration = 0.5;

              return (
                <div key={item._id} className="flex items-center">
                  <motion.div
                    className={`${bg} h-12 lg:h-14`}
                    style={{ width, transformOrigin: "left" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: show ? 1 : 0 }}
                    transition={{
                      duration: barDuration,
                      ease: "easeOut",
                      delay,
                    }}
                  />

                  <motion.div
                    className="overflow-hidden pl-6 pr-6 lg:pl-10 lg:pr-10"
                    initial={{
                      opacity: 0,
                      x: -8,
                      clipPath: "inset(0 100% 0 0)",
                    }}
                    animate={{
                      opacity: show ? 1 : 0,
                      x: show ? 0 : -8,
                      clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    }}
                    transition={{
                      delay: delay + barDuration * 0.75,
                      duration: 0.35,
                      ease: "easeOut",
                    }}
                  >
                    <span
                      className={`${text} text-[3.2rem] lg:text-[4.2rem] font-semibold italic whitespace-nowrap`}
                    >
                      {item.value}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
