import ClientJoinPage from "@/app/join/ClientJoinPage";
import { getJoinPage } from "@/sanity/fetch/SanityFetch";

export const dynamic = 'force-dynamic'

export default async function JoinPage() {
  const joinPage = await getJoinPage();

  if (!joinPage) {
    return <p className="mobile-container py-16">Failed to load join page.</p>;
  }

  return <ClientJoinPage data={joinPage} />;
}
