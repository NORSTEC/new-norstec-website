"use client";

import { useEffect, useState } from "react";
import { FeedItem, JuicerPost, MediaType } from "@/types/media";
import { MediaToggleButton } from "./MediaToggleButton";
import { FeedCard } from "./FeedCard";
import { imageBuilder } from "@/utils/imageBuilder";
import SectionHero from "@/components/sections/SectionHero";
import type { SectionHero as SectionHeroType } from "@/types/sections/sectionHero";

type ArticleApiItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: any;
  coverAlt?: string;
  publishedAt?: string;
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

  useEffect(() => {
    const loadFeed = async () => {
      setLoading(true);
      setError(null);

      try {
        // ---- Fetch Juicer posts
        const juicerRes = await fetch("https://www.juicer.io/api/feeds/norstec?per=50");
        const juicerData = await juicerRes.json();

        const juicerItems: FeedItem[] = (juicerData.posts.items || [])
          .map((post: JuicerPost) => ({
            id: post.id,
            type: post.source.source.toLowerCase() as MediaType,
            title: post.message,
            description: post.description,
            image: post.image,
            url: post.full_url,
            createdAt: new Date(post.external_created_at),
          }))
          .filter((item: { type: string }) =>
            ["youtube", "instagram", "linkedin"].includes(item.type)
          );

        // ---- Fetch articles from Sanity
        const articleRes = await fetch("/api/articles");
        if (!articleRes.ok) throw new Error("Failed to fetch articles");
        const articleData = await articleRes.json();

        const articleItems: FeedItem[] = (articleData.articles || [])
          .filter((a: ArticleApiItem) => a.slug)
          .map((a: ArticleApiItem) => ({
            id: a._id,
            type: "article" as MediaType,
            title: a.title,
            description: a.excerpt,
            image: imageBuilder(a.coverImage, { width: 800, height: 600, fit: "crop" }),
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
      <div className="normal-section min-h-screen w-full px-4 py-40 flex flex-col items-center gap-16 desktop-container">
      {loading && (
        <p className="w-full text-center">Loading feed…</p>
      )}
      {error && !loading && (
        <p className="w-full text-center text-copper">{error}</p>
      )}
      <section className="flex flex-wrap gap-3">
        {(["article", "linkedin", "youtube", "instagram"] as MediaType[]).map((type) => (
          <MediaToggleButton
            key={type}
            mediaType={type}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </section>

      <section className="w-full max-w-[1700px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    </main>
  );
}
