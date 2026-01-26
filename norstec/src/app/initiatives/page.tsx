import ClientInitiativesPage from "@/app/initiatives/ClientInitiativesPage";
import { getInitiativesPage } from "@/sanity/fetch/SanityFetch";
import type {Metadata} from "next";

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: "Explore Our Initiatives | NORSTEC",
  description:
      "Learn about NORSTEC’s mission to support student-led space projects in Norway, develop future space professionals, and strengthen the national space ecosystem.",

  metadataBase: new URL("https://norstec.no"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Explore Our Initiatives | NORSTEC",
    description:
        "NORSTEC supports student-led space projects and develops the next generation of space professionals in Norway.",
    url: "https://norstec.no/initiatives",
    images: [
      {
        url: "/images/initiatives.jpg",
        width: 1200,
        height: 630,
        alt: "Our Story | NORSTEC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Explore Our Initiatives | NORSTEC",
    description:
        "Learn about NORSTEC’s mission to support student space projects in Norway.",
    images: ["/images/initiatives.jpg"],
  },
};
export default async function InitiativesPage() {
  const initiativesPage = await getInitiativesPage();

  if (!initiativesPage) {
    return <p></p>;
  }

  return <ClientInitiativesPage data={initiativesPage} />;
}
