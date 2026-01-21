import type { Metadata } from "next";
import { getHomePage } from "@/sanity/fetch/SanityFetch";
import ClientHomePage from "@/app/ClientHomePage";
import { MetadataSection } from "@/types/metadata/metadata";
import { imageBuilder } from "@/utils/imageBuilder";

import mapGoogleBot from "@/utils/mapGoogleBot";
import mapAlternates from "@/utils/mapAlternates";

export const dynamic = 'force-dynamic'
 // midlertidig, skal sette opp webhooks.

/* =========================================================
   METADATA
   ========================================================= */
export async function generateMetadata(): Promise<Metadata> {
  const homePage = await getHomePage();

  const meta: MetadataSection | undefined = homePage?.metadata;

  if (!homePage || !meta) {
    return {
      title: "did not work",
      description: "NORSTEC supports student space projects across Norway.",
    };
  }

  const ogImage = meta.openGraph?.images?.[0];
  const twitterImage = meta.twitter?.images?.[0];

  return {
    title: meta.title ?? "NORSTEC",
    description: meta.description,

    robots: {
      index: !meta.noIndex,
      follow: !meta.noFollow,
      googleBot: mapGoogleBot(meta.googleBot),
    },

    openGraph: {
      title: meta.openGraph?.title ?? meta.title,
      description: meta.openGraph?.description ?? meta.description,
      images: ogImage
        ? [
            {
              url: imageBuilder(ogImage, {
                width: 1200,
                height: 630,
                fit: "crop",
              }),
            },
          ]
        : undefined,
    },

    twitter: {
      card: meta.twitter?.card ?? "summary_large_image",
      title: meta.twitter?.title ?? meta.openGraph?.title ?? meta.title,
      description: meta.twitter?.description ?? meta.openGraph?.description ?? meta.description,
      images: twitterImage
        ? [
            imageBuilder(twitterImage, {
              width: 1200,
              height: 630,
              fit: "crop",
            }),
          ]
        : undefined,
    },

    alternates: mapAlternates(meta.alternates),
    verification: meta.verification,
  };
}

export default async function HomePage() {
  const homePage = await getHomePage();
  console.log(homePage)
  if (!homePage) {
    return <p></p>;
  }

  return <ClientHomePage data={homePage} />;
}
