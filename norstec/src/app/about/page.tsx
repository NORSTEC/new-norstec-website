import { getAboutPage } from "@/sanity/fetch/SanityFetch";
import ClientAboutPage from "@/app/about/ClientAboutPage";
export const dynamic = 'force-dynamic'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | NORSTEC",
  description:
      "Learn about NORSTEC’s mission to support student-led space projects in Norway, develop future space professionals, and strengthen the national space ecosystem.",

  metadataBase: new URL("https://norstec.no"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Our Story | NORSTEC",
    description:
        "NORSTEC supports student-led space projects and develops the next generation of space professionals in Norway.",
    url: "https://norstec.no/about",
    images: [
      {
        url: "/images/about.jpeg",
        width: 1200,
        height: 630,
        alt: "Our Story | NORSTEC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Story | NORSTEC",
    description:
        "Learn about NORSTEC’s mission to support student space projects in Norway.",
    images: ["/images/about.jpeg"],
  },
};

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    return <p>loading</p>;
  }

  return <ClientAboutPage data={aboutPage} />;
}
