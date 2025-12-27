import type { Metadata } from "next";
import "../styles/globals.css";
import React from "react";
import { oughter, barlow } from "@/assets/fonts";
import Navbar from "@/components/static/Navbar/Navbar";
import { ThemeProvider } from "../hooks/useTheme";

export const metadata: Metadata = {
  title: "SECURING OUR FUTURE IN SPACE",
  icons: {
    icon: [
      { url: "/images/NORSTEC.png", sizes: "32x32", type: "image/png" },
      { url: "/images/NORSTECVECTOR.svg", type: "image/svg+xml" },
    ],
    apple: "/images/NORSTECIOS.png",
  },
};

const themeInitScript = `
  (() => {
    try {
      const stored = localStorage.getItem("theme-preference");
      const preference = stored === "light" || stored === "dark" ? stored : "system";
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolved = preference === "dark" ? "dark" : preference === "light" ? "light" : (systemDark ? "dark" : "light");
      document.documentElement.dataset.theme = resolved;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
    }
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${oughter.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
        <link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css" />
        <title>NORSTEC</title>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
