"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import StripesVertical from "@/components/items/stripes/StripesVertical";
import EpisodeCard from "@/components/items/podcast/EpisodeCard";
import EpisodeFlipCard from "@/components/items/podcast/EpisodeFlipCard";
import { PodcastEpisode, PodcastResponse } from "@/types/items/podcast";
import { SectionPodcast as SectionPodcastType } from "@/types/sections/sectionPodcast";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ChemtrailsRight from "@/components/items/stripes/chemtrails/ChemtrailsRight";

type SectionPodcastProps = {
  section: SectionPodcastType;
};

const API_URL = "/api/spacepodden";
const DEFAULT_LIMIT = 4;
const ACCENTS = ["sun", "beachball", "copper", "sky"] as const;
export default function SectionPodcast({ section }: SectionPodcastProps) {
  const [episodes, setEpisodes] = React.useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"next" | "prev">("next");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  React.useEffect(() => {
    let cancelled = false;
    const limit = Math.max(1, section.limit ?? DEFAULT_LIMIT);

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}?limit=${encodeURIComponent(String(limit))}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch episodes: ${res.status} ${res.statusText}`);
        }

        const data = (await res.json()) as PodcastResponse;
        if (!cancelled) {
          setEpisodes(data.episodes ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching podcast episodes:", err);
          setError("Could not load the latest episodes right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [section.limit]);

  React.useEffect(() => {
    if (loading) return;
    if (!episodes.length) {
      setSelectedIndex(0);
      return;
    }
    setSelectedIndex((idx) => (idx >= episodes.length ? 0 : idx));
  }, [episodes, loading]);

  const limit = Math.max(1, section.limit ?? DEFAULT_LIMIT);
  const hasEpisodes = episodes.length > 0;
  const count = episodes.length || (loading ? limit : 0);
  const prevIndex = count ? (selectedIndex - 1 + count) % count : 0;
  const nextIndex = count ? (selectedIndex + 1) % count : 0;
  const activeEpisode = episodes[selectedIndex];
  const prevEpisode = episodes[prevIndex];
  const nextEpisode = episodes[nextIndex];

  const goPrev = () => {
    if (!count) return;
    const dir = "prev" as const;
    setDirection(dir);
    setSelectedIndex((idx) => (idx - 1 + count) % count);
  };

  const goNext = () => {
    if (!count) return;
    const dir = "next" as const;
    setDirection(dir);
    setSelectedIndex((idx) => (idx + 1) % count);
  };

  return (
    <section className="section relative overflow-hidden">
      <ChemtrailsRight />

      <div className="relative flex flex-col h-full">
        <div className="flex flex-col gap-2 chemtrails-right pb-0!">
          <div className="flex items-center">
            <h2 className="text-h2">Spacepodden</h2>
            <span aria-hidden className="star-inline" />
          </div>
          <p>
            Tune in to the latest conversations about the future of space and technology.
          </p>
        </div>

        {error ? (
          <p className="text-copper text-lg">{error}</p>
        ) : isDesktop ? (
          <div className="relative flex items-center justify-center gap-4 lg:gap-20 h-full">
            <div className="hidden lg:flex items-center gap-3">
              <div
                className="hidden xl:block w-[300px] 3xl:w-[400px] transition-transform duration-300 hover:scale-95"
                onClick={goNext}
                style={{ transform: "perspective(1400px) rotateY(14deg) scale(0.9)" }}
              >
                {prevEpisode ? (
                  <motion.div
                    key={prevEpisode.guid ?? prevEpisode.title}
                    initial={{ opacity: 0, x: 0, scale: 0.86 }}
                    animate={{ opacity: 1, x: 0, scale: 0.9 }}
                    exit={{ opacity: 0, x: 0, scale: 0.86 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.9, 0.2, 1] }}
                  >
                    <EpisodeFlipCard
                      episode={prevEpisode}
                      interactive={false}
                      showAudio={false}
                      className="h-[450px]! 3xl:h-[600px]! cursor-pointer"
                    />
                  </motion.div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={goNext}
                className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-transparent hover:text-moody bg-moody text-egg  transition-all duration-200"
                aria-label="Previous episode"
              >
                <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200 rotate-[180deg]">
                  trending_flat
                </span>
              </button>
            </div>

            {/* Center active card (flip on click) */}
            <div className=" w-[400px] 3xl:w-[550px] transition-transform duration-300 transform-gpu">
              <AnimatePresence mode="popLayout" initial={false}>
                {activeEpisode ? (
                  <motion.div
                    key={activeEpisode.guid ?? activeEpisode.title}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.22, 0.9, 0.2, 1] }}
                  >
                    <EpisodeFlipCard episode={activeEpisode} />
                  </motion.div>
                ) : (
                  <motion.p
                    key="empty"
                    className="text-moody/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    No episodes published yet.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="flex items-center justify-center h-8 w-20 border-2 border-moody rounded-full cursor-pointer hover:bg-transparent hover:text-moody bg-moody text-egg transition-all duration-200"
                aria-label="Next episode"
              >
          <span className="icon icon-24 md:icon-40 icon-400 icon-filled transition-all duration-200 ">
            trending_flat
          </span>
              </button>
              <div
                className="hidden xl:block w-[300px] 3xl:w-[400px] transition-transform duration-300 hover:scale-95 cursor-pointer"
                onClick={goNext}
                style={{ transform: "perspective(1400px) rotateY(-14deg) scale(0.9)" }}
              >
                {nextEpisode ? (
                  <motion.div
                    key={nextEpisode.guid ?? nextEpisode.title}
                    initial={{ opacity: 0, x: 0, scale: 0.86 }}
                    animate={{ opacity: 1, x: 0, scale: 0.9 }}
                    exit={{ opacity: 0, x: -0, scale: 0.86 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.9, 0.2, 1] }}
                  >
                    <EpisodeFlipCard
                      episode={nextEpisode}
                      interactive={false}
                      showAudio={false}
                      className="h-[450px]! 3xl:h-[600px]! cursor-pointer"
                    />
                  </motion.div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {hasEpisodes ? (
              episodes.map((episode, idx) => (
                <EpisodeCard
                  key={episode.guid ?? `${episode.title}-${idx}`}
                  episode={episode}
                  accent={ACCENTS[idx % ACCENTS.length]}
                />
              ))
            ) : (
              <p className="text-moody/80">No episodes published yet.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
