import React from "react";

export type StripePaletteName = "default" | "summit";

const DEFAULT_STRIPE_COLORS = ["#1697B7", "#30C3CD", "#F3AD78", "#E8804C"] as const;
const SUMMIT_STRIPE_COLORS = ["#3D5B81", "#7EA1E6", "#EE6B4D", "#98C0D9"] as const;

const StripePaletteContext = React.createContext<StripePaletteName>("default");

export function StripePaletteProvider({
  palette = "default",
  children,
}: {
  palette?: StripePaletteName;
  children: React.ReactNode;
}) {
  return <StripePaletteContext.Provider value={palette}>{children}</StripePaletteContext.Provider>;
}

export function useStripePalette() {
  const palette = React.useContext(StripePaletteContext);
  const colors = palette === "summit" ? SUMMIT_STRIPE_COLORS : DEFAULT_STRIPE_COLORS;
  return { palette, colors, colorsReversed: [...colors].reverse() };
}

export const STRIPE_PALETTES = {
  default: DEFAULT_STRIPE_COLORS,
  summit: SUMMIT_STRIPE_COLORS,
} as const;
