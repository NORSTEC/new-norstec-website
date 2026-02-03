"use client";

import { useEffect, useState } from "react";
import { FeedItem, JuicerPost, MediaType } from "@/types/media";
import { MediaToggleButton } from "./MediaToggleButton";
import { FeedCard } from "./FeedCard";
import SectionHero from "@/components/sections/SectionHero";
import type { SectionHero as SectionHeroType } from "@/types/sections/sectionHero";
import FilterSection from "@/components/static/FilterSection";
import StripesFilter from "@/components/items/stripes/StripesFilter";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import { imageBuilder } from "@/utils/imageBuilder";
import MobileMediaFilter from "./MobileMediaFilter";

type ArticleApiItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  coverAlt?: string;
  publishedAt?: string;
};

type Covers = {
  coverArticle?: string;
  coverYoutube?: string;
  coverInstagram?: string;
  coverLinkedin?: string;
  useJuicerImages?: boolean;
};

type Props = {
  hero?: SectionHeroType | null;
};

export default function ClientArticlesPage({ hero }: Props) {
  const [selected, setSelected] = useState<MediaType[]>([
    "article",
    "youtube",
    "instagram",
    "linkedin",
  ]);

  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fallbackCover = "/images/landing.jpeg";

  useEffect(() => {
    const loadFeed = async () => {
      setLoading(true);
      setError(null);

      try {
        // ---- Fetch articles from Sanity
        const articleRes = await fetch("/api/articles", { cache: "no-store" });
        if (!articleRes.ok) throw new Error("Failed to fetch articles");
        const articleData = await articleRes.json();
        const covers: Covers = articleData.covers ?? {};
        console.log("Article covers from API", covers);

        // ---- Fetch Juicer posts
        const juicerRes = await fetch("https://www.juicer.io/api/feeds/norstec?per=50", {
          cache: "no-store",
        });
        const juicerData = await juicerRes.json();

        const useJuicerImages = !!covers.useJuicerImages;

        const juicerItems: FeedItem[] = (juicerData.posts.items || [])
          .map((post: JuicerPost) => {
            const type = post.source.source.toLowerCase() as MediaType;
            const coverKey = `cover${type.charAt(0).toUpperCase() + type.slice(1)}` as keyof Covers;
            const coverUrl = (covers?.[coverKey] as string) || fallbackCover;
            const juicerImage = post.image;
            return {
              id: post.id,
              type,
              title: post.message,
              description: post.description,
            image: useJuicerImages && juicerImage ? juicerImage : coverUrl,
              url: post.full_url,
              createdAt: new Date(post.external_created_at),
            };
          })
          .filter((item: { type: string }) =>
            ["youtube", "instagram", "linkedin"].includes(item.type)
          );

        const articleItems: FeedItem[] = (articleData.articles || [])
          .filter((a: ArticleApiItem) => a.slug)
          .map((a: ArticleApiItem) => ({
            id: a._id,
            type: "article" as MediaType,
            title: a.title,
            description: a.excerpt,
            image:
              (typeof a.coverImage === "string"
                ? a.coverImage
                : a.coverImage
                ? imageBuilder(a.coverImage, { width: 800, height: 600, fit: "crop" })
                : undefined) ||
              (covers?.coverArticle as string) ||
              fallbackCover,
            url: `/articles/${a.slug}`,
            createdAt: a.publishedAt ? new Date(a.publishedAt) : new Date(),
          }));

        // ---- Filter + merge
        const merged = [...juicerItems, ...articleItems]
          .filter((item) => selected.includes(item.type))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setFeed(merged);
      } catch (err) {
        console.error("Error loading feed", err);
        setError("Could not load feed right now.");
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, [selected]);

  return (
    <main className="w-full">
      {hero && <SectionHero section={hero} className="no-snap" />}
      <FilterSection selected={selected} setSelected={setSelected} />
      <div className="normal-section min-h-screen w-full flex flex-col items-center gap-16 desktop-container py-20! xl:py-0!">
        {error && !loading && (
          <p className="w-full text-center text-copper">{error}</p>
        )}

        <div className="relative w-full">
          <MobileMediaFilter selected={selected} setSelected={setSelected} />
          <StripesFilter
            selected={selected}
            setSelected={setSelected}
          />
          <section className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 py-20 min-h-screen gap-30 sm:gap-5 xl:gap-0">
            {feed.map((item) => (
              <FeedCard key={`${item.type}-${item.id}`} item={item} />
            ))}
            {feed.length === 0 && !loading && (
              <p className="col-span-full text-center">
                No items to display. Try selecting different media types.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
