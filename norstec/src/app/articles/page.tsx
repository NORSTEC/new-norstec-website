import ClientArticlesPage from "./ClientArticlesPage";
import { getArticlePage } from "@/sanity/fetch/SanityFetch";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articlePage = await getArticlePage();
  const hero =
    articlePage?.sections?.find((section) => section._type === "sectionHero") ?? null;

  return <ClientArticlesPage hero={hero as any} />;
}
