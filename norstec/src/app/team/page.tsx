import ClientTeamPage from "@/app/team/ClientTeamPage";
import { getTeamPage } from "@/sanity/fetch/SanityFetch";
import type {Metadata} from "next";

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: "Where Space Careers Launch | TEAM",
  description: "NORSTEC supports student space projects across Norway.",

  metadataBase: new URL("https://norstec.no"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "Where Space Careers Launch | TEAM",
    description: "NORSTEC supports student space projects across Norway.",
    url: "https://norstec.no",
    images: [
      {
        url: "/team.jpeg",
        width: 1200,
        height: 630,
        alt: "NORSTEC",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Where Space Careers Launch | TEAM",
    description: "NORSTEC supports student space projects across Norway.",
    images: ["/team.jpeg"],
  },
};

export default async function TeamPage() {
  const teamPage = await getTeamPage();

  if (!teamPage) {
    return <p className="mobile-container py-16">Failed to load team page.</p>;
  }

  return <ClientTeamPage data={teamPage} />;
}
