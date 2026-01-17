"use client";

import { useEffect, useRef } from "react";
import { InitiativePage } from "@/types/pages/initiativePage";
import ClientInitiativePage from "@/app/initiatives/[slug]/ClientInitiativePage";
import { useTheme } from "@/hooks/useTheme";

export default function ClientSummitPage({ initiative }: { initiative: InitiativePage }) {
  const { setTheme, theme } = useTheme();
  const prevThemeRef = useRef(theme);
  const prevPrefRef = useRef<string | null>(null);

  useEffect(() => {
    prevThemeRef.current = theme;
    try {
      prevPrefRef.current = localStorage.getItem("theme-preference");
    } catch {
      prevPrefRef.current = null;
    }

    setTheme("dark");

    return () => {
      setTheme(prevThemeRef.current);

      try {
        const prevPref = prevPrefRef.current;
        if (prevPref === "light" || prevPref === "dark") {
          localStorage.setItem("theme-preference", prevPref);
        } else {
          localStorage.removeItem("theme-preference");
        }
      } catch {

      }
    };
  }, [setTheme, theme]);

  return (
    <ClientInitiativePage
      initiative={initiative}
      sectionClassName=""
      stripePalette="summit"
    />
  );
}
