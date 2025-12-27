import { notFound } from "next/navigation";
import ClientInitiativePage from "./ClientInitiativePage";
import { getInitiativeBySlug } from "@/sanity/fetch/SanityFetch";

export const dynamic = "force-dynamic";

export default async function InitiativePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) notFound();

  const initiative = await getInitiativeBySlug(decodeURIComponent(slug).trim());

  if (!initiative) notFound();

  return <ClientInitiativePage initiative={initiative} />;
}
