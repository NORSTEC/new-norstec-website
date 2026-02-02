import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const PAGE_ARTICLES_QUERY = `
*[_type == "articlePage"][0]{
  "articles": sections[_type == "sectionArticles"][0].articles[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    coverAlt,
    publishedAt
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
    const fromPage = pageResult?.articles ?? [];

    if (Array.isArray(fromPage) && fromPage.length > 0) {
      return NextResponse.json({ articles: fromPage });
    }

    const fallback = await client.fetch(FALLBACK_ARTICLES_QUERY);
    return NextResponse.json({ articles: fallback });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
