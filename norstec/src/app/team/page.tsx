import ClientTeamPage from "@/app/team/ClientTeamPage";
import { getTeamPage } from "@/sanity/fetch/SanityFetch";

export const revalidate = 5;

export default async function TeamPage() {
  const teamPage = await getTeamPage();

  if (!teamPage) {
    return <p className="mobile-container py-16">Failed to load team page.</p>;
  }

  return <ClientTeamPage data={teamPage} />;
}
