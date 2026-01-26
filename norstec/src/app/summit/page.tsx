import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ClientSummitPage from "@/app/summit/ClientSummitPage";
import { getInitiativeBySlug } from "@/sanity/fetch/SanityFetch";

const SUMMIT_SLUG = "summit";
const SUMMIT_DATE = "2026-03-12T00:00:00Z";

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const now = new Date();
  const event = new Date(SUMMIT_DATE);

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diffMs = event.getTime() - now.getTime();

  const days = Math.max(0, Math.ceil(diffMs / MS_PER_DAY));

  const title = days === 0 ? "Today! | SUMMIT" : `${days} Days | SUMMIT`;
  const description = "Countdown to the NORSTEC Summit.";

  return {
    title,
    description,

    metadataBase: new URL("https://norstec.no"),

    openGraph: {
      type: "website",
      title,
      description,
      images: [
        {
          url: "/images/summitTest.png",
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/summitTest.png"],
    },
  };
}


export default async function SummitPage() {
  const initiative = await getInitiativeBySlug(SUMMIT_SLUG);
  if (!initiative) {
    notFound();
  }

  return <ClientSummitPage initiative={initiative} />;
}
