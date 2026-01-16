"use client";

import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function FooterGate() {
  const pathname = usePathname();
  const isSummit = pathname?.startsWith("/summit");

  return (
    <Footer
      backgroundColor={isSummit ? "#98C0D9" : undefined}
      logoStyle={
        isSummit
          ? {
              filter:
                "brightness(0) saturate(100%) invert(13%) sepia(26%) saturate(453%) hue-rotate(206deg) brightness(96%) contrast(93%)",
            }
          : undefined
      }
    />
  );
}
