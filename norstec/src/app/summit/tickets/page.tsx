
import type { Metadata } from "next";
import { redirect } from "next/navigation";

const REDIRECT_URL = "https://secure.tickster.com/no/5tkvnjujg7tfg3p/products";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Securing Our Future In Space | NORSTEC",
  description: "NORSTEC supports student space projects across Norway.",

  metadataBase: new URL("https://norstec.no"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Securing Our Future In Space | NORSTEC",
    description: "NORSTEC supports student space projects across Norway.",
    url: "https://norstec.no",
    images: [
      {
        url: "/images/landing.jpeg",
        width: 1200,
        height: 630,
        alt: "NORSTEC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Securing Our Future In Space | NORSTEC",
    description: "NORSTEC supports student space projects across Norway.",
    images: ["/images/landing.jpeg"],
  },
};

export default function TicketsPage() {
  redirect(REDIRECT_URL);
}