import { motion } from "motion/react";

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

// fuck hydration errors
const HERO_TITLE_CLASSES =
    "whitespace-nowrap text-[20.5vh] md:text-[22vw] 3xl:text-[19rem] " +
    "absolute right-0 top-[88.5vh] -translate-y-1/2 -translate-x-[10%] rotate-90 origin-right " +
    "md:static md:right-auto md:top-auto md:translate-y-0 md:translate-x-0 md:rotate-0 md:origin-center font-barlow font-bold";

export default function Hero({
                                 title = "NORSTEC",
                                 tagline = "Securing our future in space.",
                             }: HeroProps) {
    const titleStart = stripeTransition.duration;
    const taglineStart = titleStart + title.length * TITLE_LETTER_DELAY * 1.5;

    return (
        <header className="md:h-screen w-full relative overflow-hidden snap-start">
            <motion.div
                className="pointer-events-none absolute inset-y-0 left-0 flex z-0"
            >
                <div className="flex h-full gap-[0.75rem] md:gap-[1rem] xl:gap-[1.3rem] 3xl:gap-[2rem] pl-[1rem] md:pl-[3rem] lg:pl-[5rem] xl:pl-[7rem] 3xl:pl-[15rem]">
                    {[
                        "bg-sky",
                        "bg-beachball",
                        "bg-sun",
                        "bg-copper",
                    ].map((color, i) => (
                        <motion.span
                            key={i}
                            className={`h-full w-[1rem] md:w-[2rem] xl:w-[2.25rem] 3xl:w-[2.5rem]  origin-top ${color}`}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{
                                delay: i * 0.10,
                                duration: 0.35,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <div className="text-moody flex flex-col md:items-center md:justify-center w-full h-[88.5vh] md:h-[85%] leading-none relative z-10">
                <h1 className={HERO_TITLE_CLASSES}>
                    {title.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            className="inline-block"
                            initial={{ opacity: 0, scale: 0.9, y: 0 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
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

                <h2 className="hidden md:block text-[3vw] 3xl:text-[3rem] italic font-barlow font-semibold">
                    {tagline.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            className="inline-block"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: taglineStart + i * TAGLINE_LETTER_DELAY,
                                duration: 0.25,
                                ease: "easeOut",
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
