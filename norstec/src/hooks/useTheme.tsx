"use client";

import React from "react";

type ThemeSetting = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeSetting;
  resolvedTheme: "light" | "dark";
  setTheme: (t: ThemeSetting) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function resolveTheme(theme: ThemeSetting) {
  if (theme === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

function getInitialTheme(): ThemeSetting {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.dataset.theme;
    if (attr === "light" || attr === "dark") return attr;
  }
  return "system";
}

function getInitialResolved(): "light" | "dark" {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.dataset.theme;
    if (attr === "dark") return "dark";
    if (attr === "light") return "light";
  }
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<ThemeSetting>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(getInitialResolved);

  // Load persisted preference
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme-preference");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme("system");
    }
  }, []);

  // React to system changes when on "system"
  React.useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const next = mq.matches ? "dark" : "light";
      setResolvedTheme(next);
      document.documentElement.dataset.theme = next;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  // Apply chosen theme
  React.useEffect(() => {
    const next = resolveTheme(theme);
    setResolvedTheme(next);
    document.documentElement.dataset.theme = next;
    if (theme === "light" || theme === "dark") {
      localStorage.setItem("theme-preference", theme);
    } else {
      localStorage.removeItem("theme-preference");
    }
  }, [theme]);

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => {
      const next = resolveTheme(prev) === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme-preference", next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
