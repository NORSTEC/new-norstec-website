import type { Metadata } from "next";
import { getHomePage } from "@/sanity/fetch/SanityFetch";
import ClientHomePage from "@/app/ClientHomePage";


export const dynamic = 'force-dynamic'
 // midlertidig, skal sette opp webhooks.

export const metadata: Metadata = {
  title: "Securing our future in space | NORSTEC",
  description: "NORSTEC supports student space projects across Norway.",

  metadataBase: new URL("https://norstec.no"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Securing our future in space | NORSTEC",
    description: "NORSTEC supports student space projects across Norway.",
    url: "https://norstec.no",
    images: [
      {
        url: "/landing.jpeg",
        width: 1200,
        height: 630,
        alt: "NORSTEC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Securing our future in space | NORSTEC",
    description: "NORSTEC supports student space projects across Norway.",
    images: ["/landing.jpeg"],
  },
};

export default async function HomePage() {
  const homePage = await getHomePage();
  console.log(homePage)
  if (!homePage) {
    return <p></p>;
  }

  return <ClientHomePage data={homePage} />;
}
