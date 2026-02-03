"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { useMediaQuery } from "@/hooks/useMediaQuery";

type ArticleApiItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
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
  const fallbackCover = "/images/landing.jpeg";
  const [mobilePage, setMobilePage] = useState(1);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isXL = useMediaQuery("(min-width: 1280px)");
  useEffect(() => {
    const loadFeed = async () => {
      setLoading(true);
      setError(null);

      try {
        // ---- Fetch articles from Sanity
        const articleRes = await fetch("/api/articles", { cache: "no-store" });
        if (!articleRes.ok) throw new Error("Failed to fetch articles");
        const articleData = await articleRes.json();

        // ---- Fetch Juicer posts
        const juicerRes = await fetch("https://www.juicer.io/api/feeds/norstec?per=50", {
          cache: "no-store",
        });
        const juicerData = await juicerRes.json();

        const juicerItems: FeedItem[] = (juicerData.posts.items || [])
          .map((post: JuicerPost) => {
            const type = post.source.source.toLowerCase() as MediaType;
            const juicerImage = post.image;
            return {
              id: post.id,
              type,
              title: post.message,
              description: post.description,
              image: juicerImage || fallbackCover,
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
        setMobilePage(1);
      } catch (err) {
        console.error("Error loading feed", err);
        setError("Could not load feed right now.");
      } finally {
        setLoading(false);
      }
    };

    loadFeed();
  }, [selected]);

  useEffect(() => {
    // reset to first page when switching to desktop or mobile
    setMobilePage(1);
  }, [isXL]);

  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(feed.length / PAGE_SIZE));
  const pageClamped = Math.min(mobilePage, totalPages);
  const mobileSlice = feed.slice((pageClamped - 1) * PAGE_SIZE, pageClamped * PAGE_SIZE);
  const displayFeed = isXL ? feed : mobileSlice;

  const goPage = (nextPage: number) => {
    setMobilePage(nextPage);
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <main className="w-full">
      {hero && <SectionHero section={hero} className="no-snap" />}
      <FilterSection selected={selected} setSelected={setSelected} />
      <div className="normal-section min-h-screen w-full flex flex-col items-center gap-16 desktop-container py-20! xl:py-0!">
        {error && !loading && <p className="w-full text-center text-copper">{error}</p>}

        <div className="relative w-full" ref={listRef}>
          <MobileMediaFilter selected={selected} setSelected={setSelected} />
          <StripesFilter selected={selected} setSelected={setSelected} />
          <section className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 py-20 min-h-screen gap-30 sm:gap-5 xl:gap-0">
            {displayFeed.map((item) => (
              <FeedCard key={`${item.type}-${item.id}`} item={item} />
            ))}
            {feed.length === 0 && !loading && (
              <p className="col-span-full text-center">
                No items to display. Try selecting different media types.
              </p>
            )}
          </section>
          {!isXL && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goPage(Math.max(1, pageClamped - 1))}
                disabled={pageClamped === 1}
                className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-transparent hover:text-moody bg-moody text-egg  transition-all duration-200"
              >
                <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200 rotate-[180deg]">
                  trending_flat
                </span>
              </button>
              <span className="text-sm text-moody">
                Page {pageClamped} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => goPage(Math.min(totalPages, pageClamped + 1))}
                disabled={pageClamped === totalPages}
                className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-transparent hover:text-moody bg-moody text-egg transition-all duration-200"
              >
                <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200 ">
                  trending_flat
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
