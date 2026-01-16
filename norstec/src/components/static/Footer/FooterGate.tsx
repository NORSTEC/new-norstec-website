"use client";

import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function FooterGate() {
  const pathname = usePathname();
  const hideFooter = pathname?.startsWith("/summit");

  if (hideFooter) return null;
  return <Footer />;
}
