import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const PAGE_ARTICLES_QUERY = `
{
  "sectionArticles": *[_type == "sectionArticles"][0]{
    articles[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt
    },
    "coverArticle": coverArticle.asset->url,
    "coverYoutube": coverYoutube.asset->url,
    "coverInstagram": coverInstagram.asset->url,
    "coverLinkedin": coverLinkedin.asset->url
  }
}
`;

const FALLBACK_ARTICLES_QUERY = `
*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  coverAlt,
  publishedAt
}
`;

export async function GET() {
  try {
    const pageResult = await client.fetch(PAGE_ARTICLES_QUERY);
    const fromPage = pageResult?.sectionArticles?.articles ?? [];
    const covers = pageResult?.sectionArticles
      ? {
          coverArticle: pageResult.sectionArticles.coverArticle ?? "",
          coverYoutube: pageResult.sectionArticles.coverYoutube ?? "",
          coverInstagram: pageResult.sectionArticles.coverInstagram ?? "",
          coverLinkedin: pageResult.sectionArticles.coverLinkedin ?? "",
        }
      : {};

    if (Array.isArray(fromPage) && fromPage.length > 0) {
      return NextResponse.json({ articles: fromPage, covers });
    }

    const fallback = await client.fetch(FALLBACK_ARTICLES_QUERY);
    return NextResponse.json({ articles: fallback, covers: {} });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles", detail: (error as Error)?.message ?? String(error) },
      { status: 500 }
    );
  }
}
