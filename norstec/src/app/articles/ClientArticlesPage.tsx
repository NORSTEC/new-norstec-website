"use client";

import { useEffect, useState } from "react";
import { useEpisodes } from "@/hooks/useEpisodes";
import { FeedItem, JuicerPost, MediaType } from "@/types/media";
import { MediaToggleButton } from "./MediaToggleButton";
import { FeedCard } from "./FeedCard";

export default function ClientArticlesPage() {
  const [selected, setSelected] = useState<MediaType[]>([
    "podcast",
    "youtube",
    "instagram",
    "linkedin",
  ]);

  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { episodes, loading: episodesLoading, error } = useEpisodes({
    limit: 10,
  });

  const imageBaseUrl = "https://img.rss.com/spacepodden/160/";

  useEffect(() => {
    const loadFeed = async () => {
      setLoading(true);

      // ---- Fetch Juicer posts
      const juicerRes = await fetch(
        "https://www.juicer.io/api/feeds/norstec?per=50"
      );
      const juicerData = await juicerRes.json();

      const juicerItems: FeedItem[] = (juicerData.posts.items || []).map(
        (post: JuicerPost) => ({
          id: post.id,
          type: post.source.source.toLowerCase() as MediaType,
          description: post.message,
          image: post.image,
          url: post.full_url,
          createdAt: new Date(post.external_created_at),
        })
      );

      // ---- Normalize podcast episodes
      const podcastItems: FeedItem[] = episodes.map((ep) => ({
        id: ep.guid,
        type: "podcast",
        title: ep.title,
        description: ep.description,
        image: `${imageBaseUrl}${ep.episode_cover}`,
        url: ep.episode_asset_url,
        createdAt: new Date(ep.pub_date),
      }));

      // ---- Filter + merge
      const merged = [...juicerItems, ...podcastItems]
        .filter((item) => selected.includes(item.type))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

      setFeed(merged);
      setLoading(false);
    };

    if (!episodesLoading) loadFeed();
  }, [selected, episodes, episodesLoading]);

  if (episodesLoading || loading) {
    return <p className="normal-section min-h-screen py-20 text-center">Loading feed…</p>;
  }

  if (error) {
    return <p className="normal-section min-h-screen py-20 text-center">Error loading podcasts</p>;
  }

  return (
    <main className="normal-section min-h-screen w-full px-4 py-40 flex flex-col items-center gap-16">
      <section className="flex flex-wrap gap-3">
        {(["podcast", "linkedin", "youtube", "instagram"] as MediaType[]).map(
          (type) => (
            <MediaToggleButton
              key={type}
              mediaType={type}
              selected={selected}
              setSelected={setSelected}
            />
          )
        )}
      </section>

      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {feed.map((item) => (
          <FeedCard key={`${item.type}-${item.id}`} item={item} />
        ))}
        {feed.length === 0 && (
          <p className="col-span-full text-center">No items to display. Try selecting different media types.</p>
        )}
      </section>
    </main>
  );
}
