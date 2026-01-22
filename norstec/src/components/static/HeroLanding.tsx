"use client";

import { motion } from "motion/react";
import Mountain from "@/components/items/Mountain";


type HeroProps = {
  title?: string;
  tagline?: string;
};

const stripeTransition = {
  duration: 0.3,
  ease: "linear" as const,
};

const TITLE_LETTER_DELAY = 0.08;
const TAGLINE_LETTER_DELAY = 0.04;

const HERO_TITLE_CLASSES =
    "whitespace-nowrap text-[18vh] md:text-[22vw] 3xl:text-[19rem] " +
    "absolute right-0 top-[85vh] -translate-y-1/2 -translate-x-[10%] rotate-90 origin-right " +
    "md:static md:right-auto md:top-auto md:translate-y-0 md:translate-x-0 md:rotate-0 md:origin-center font-barlow font-thin";

export default function HeroLanding({
                                      title = "NORSTEC",
                                      tagline = "Securing our future in space.",
                                    }: HeroProps) {
  const titleStart = stripeTransition.duration;
  const taglineStart = stripeTransition.duration;
  const typeSpeed = TAGLINE_LETTER_DELAY;

  return (
      <header className="md:h-screen w-full relative overflow-hidden snap-start ">
        {/* Mountain background */}
        <div className="absolute inset-0 z-0">
          <Mountain />
        </div>

        {/* Content */}
        <div className="text-moody flex flex-col md:items-center md:justify-center w-full h-[90vh] md:h-[85%] leading-none relative z-10">
          <h1 className={HERO_TITLE_CLASSES}>
            {title.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: titleStart + i * TITLE_LETTER_DELAY,
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
          </h1>

          <h2 className="hidden md:block text-[3vw] 3xl:text-[3rem] italic font-barlow font-light">
            {tagline.split("").map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: taglineStart + i * typeSpeed,
                      duration: 0.01,
                      ease: "linear",
                    }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
          </h2>
        </div>
      </header>
  );
}
