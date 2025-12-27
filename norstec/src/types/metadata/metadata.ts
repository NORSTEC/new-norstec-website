import { Image } from "@/types/image/image";

export interface MetadataSection {
  /* =========================
       SEO
       ========================= */
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;

  /* =========================
       Robots
       ========================= */
  noIndex?: boolean;
  noFollow?: boolean;

  googleBot?: {
    noImageIndex?: boolean;
    maxSnippet?: number;
    maxImagePreview?: "none" | "standard" | "large";
    maxVideoPreview?: number;
  };

  /* =========================
       Open Graph
       ========================= */
  openGraph?: {
    title?: string;
    description?: string;
    type?: "website" | "article";
    siteName?: string;
    url?: string;
    images?: Image[];
  };

  /* =========================
       Twitter / X
       ========================= */
  twitter?: {
    card?: "summary" | "summary_large_image" | "player" | "app";
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: Image[];
  };

  /* =========================
       Icons
       ========================= */
  icons?: {
    faviconPng?: Image;
    appleTouchIcon?: Image;
  };

  /* =========================
       Alternates / i18n
       ========================= */
  alternates?: {
    canonical?: string;
    languages?: {
      locale: string;
      url: string;
    }[];
  };

  /* =========================
       Verification
       ========================= */
  verification?: {
    google?: string;
    bing?: string;
    yandex?: string;
    facebook?: string;
  };
}
