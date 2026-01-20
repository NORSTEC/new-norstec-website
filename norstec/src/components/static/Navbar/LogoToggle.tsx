"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTheme } from "@/hooks/useTheme";

type LogoToggleProps = {
  open: boolean;
  src?: string;
  alt?: string;
  className?: string;
  forceDark?: boolean;
};

export default function LogoToggle({
  open,
  src = "/images/logo.png",
  alt = "NORSTEC logo",
  className,
  forceDark = false,
}: LogoToggleProps) {
  const { resolvedTheme } = useTheme();
  const effectiveTheme = forceDark ? "dark" : resolvedTheme;
  const forceColor = effectiveTheme === "dark" || open;

  return (
    <div className={["relative h-10 w-10", className ?? ""].join(" ")}>
      <motion.div
        animate={{ opacity: forceColor ? 0 : 1 }}
        transition={{ duration: 0.2, ease: [0.25, 0.8, 0.5, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-contain"
          style={
            forceColor
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
        animate={{ opacity: forceColor ? 1 : 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.8, 0.5, 1] }}
      >
        <Image src={src} alt={alt} fill priority className="object-contain" />
      </motion.div>
    </div>
  );
}
