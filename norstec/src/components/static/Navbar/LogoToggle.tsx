"use client";

import Image from "next/image";
import { motion } from "motion/react";

type LogoToggleProps = {
  open: boolean;
  src?: string;
  alt?: string;
  className?: string;
};

export default function LogoToggle({
  open,
  src = "/images/logo.png",
  alt = "NORSTEC logo",
  className,
}: LogoToggleProps) {
  const isDark = typeof document !== "undefined"
    ? document.documentElement.dataset.theme === "dark"
    : false;

  return (
    <div className={["relative h-10 w-10", className ?? ""].join(" ")}>
      <motion.div
        animate={{ opacity: open || isDark ? 0 : 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.8, 0.5, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-contain"
          style={
            isDark
              ? undefined
              : {
                  filter:
                    "brightness(0) saturate(100%) invert(13%) sepia(26%) saturate(453%) hue-rotate(206deg) brightness(96%) contrast(93%)",
                }
          }
        />
      </motion.div>

      {/* Original (fullfarge) */}
      <motion.div
        initial={false}
        animate={{ opacity: open || isDark ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.8, 0.5, 1] }}
      >
        <Image src={src} alt={alt} fill priority className="object-contain" />
      </motion.div>
    </div>
  );
}
