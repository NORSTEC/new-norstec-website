import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/sanity/fetch/SanityFetch";
import ClientArticlePage from "./ClientArticlePage";

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slug) notFound();

  const article = await getArticleBySlug(decodeURIComponent(slug).trim());

  if (!article) notFound();

  return <ClientArticlePage article={article} />;
}
