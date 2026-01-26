import ClientJoinPage from "@/app/join/ClientJoinPage";
import { getJoinPage } from "@/sanity/fetch/SanityFetch";

export const dynamic = 'force-dynamic'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build the Future of Space | NORSTEC",
  description:
      "Join NORSTEC and become part of Norway’s student-driven space community. Work on real space projects, learn from experts, and launch your career.",

  metadataBase: new URL("https://norstec.no"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Build the Future of Space | NORSTEC",
    description:
        "Become part of Norway’s student-driven space community and help build the future of space.",
    url: "https://norstec.no/join",
    images: [
      {
        url: "/images/join.jpg",
        width: 1200,
        height: 630,
        alt: "Join NORSTEC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Build the Future of Space | NORSTEC",
    description:
        "Join Norway’s student-driven space community and work on real space missions.",
    images: ["/images/join.jpg"],
  },
};

export default async function JoinPage() {
  const joinPage = await getJoinPage();

  if (!joinPage) {
    return <p className="mobile-container py-16">Failed to load join page.</p>;
  }

  return <ClientJoinPage data={joinPage} />;
}
