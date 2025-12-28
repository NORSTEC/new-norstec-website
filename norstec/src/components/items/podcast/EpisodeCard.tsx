"use client";

import Image from "next/image";
import React from "react";
import { PodcastEpisode } from "@/types/items/podcast";

const COVER_BASE = "https://img.rss.com/spacepodden/320/";

type EpisodeCardProps = {
  episode: PodcastEpisode;
  accent?: "sun" | "beachball" | "copper" | "sky";
};

function formatDuration(totalSeconds?: number) {
  if (!totalSeconds || totalSeconds <= 0) return "";

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toPlainText(html?: string) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>\s*<p>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function EpisodeCard({ episode, accent = "sun" }: EpisodeCardProps) {
  const coverSrc = episode.episode_cover ? `${COVER_BASE}${episode.episode_cover}` : null;
  const duration = formatDuration(episode.itunes_duration);
  const published = formatDate(episode.pub_date);

  const meta = [
    episode.itunes_season != null && episode.itunes_episode != null
      ? `S${episode.itunes_season}, E${episode.itunes_episode}`
      : null,
    duration || null,
    published || null,
  ].filter(Boolean) as string[];

  const description = toPlainText(episode.description);
  const accentClass =
    accent === "beachball"
      ? "from-beachball/15"
      : accent === "copper"
        ? "from-copper/15"
        : accent === "sky"
          ? "from-sky/15"
          : "from-sun/15";

  return (
    <article className="group relative overflow-hidden rounded-2xl border-2 border-moody/15 bg-egg text-moody shadow-[0_25px_60px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClass} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative flex flex-col gap-4 p-5 lg:p-6">
        <div className="flex gap-4 items-start">
          {coverSrc ? (
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-moody/10 bg-moody/5">
              <Image
                src={coverSrc}
                alt={episode.title}
                fill
                sizes="96px"
                className="object-cover"
                priority={false}
              />
            </div>
          ) : null}

          <div className="flex-1 space-y-2">
            <p className="text-xs uppercase tracking-[0.12em] text-moody/70">Episode</p>
            <h3 className="text-[1.2rem] lg:text-[1.35rem] font-semibold leading-tight">
              {episode.title}
            </h3>

            {meta.length ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {meta.map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 rounded-full bg-moody text-egg px-3 py-1 text-[0.7rem] uppercase tracking-[0.08em]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {description ? (
          <p
            className="text-[0.98rem] leading-relaxed text-moody/80"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
        ) : null}

        {episode.episode_asset_url ? (
          <audio
            controls
            controlsList="nodownload"
            className="w-full rounded-lg border border-moody/10 bg-transparent text-moody"
          >
            <source src={episode.episode_asset_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : null}
      </div>
    </article>
  );
}
