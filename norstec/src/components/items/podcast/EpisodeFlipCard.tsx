"use client";

import Image from "next/image";
import React from "react";
import { PodcastEpisode } from "@/types/items/podcast";

type EpisodeFlipCardProps = {
  episode: PodcastEpisode;
  interactive?: boolean;
  className?: string;
  showAudio?: boolean;
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

function formatDescriptionHtml(html?: string) {
  if (!html) return "";

  // Keep spacing sensible and make links usable.
  const withBreaks = html
    .replace(/<\/p>\s*<p>/gi, "<br/><br/>")
    .replace(/<br\s*\/?>/gi, "<br/>");

  const collapsed = withBreaks
    // Collapse long runs of breaks to a maximum of two (single blank line)
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br/><br/>")
    // Remove trailing breaks/whitespace
    .replace(/(<br\s*\/?>\s*)+$/i, "")
    .trim();

  return collapsed.replace(/<a\b([^>]*)>/gi, (_match, attrs) => {
    const hasTarget = /target\s*=/.test(attrs);
    const hasRel = /rel\s*=/.test(attrs);
    const classAttr = /class\s*=/.test(attrs)
      ? attrs.replace(/class\s*=\s*["']?/, (m: string) => `${m}underline text-egg `)
      : `class="underline text-egg" ${attrs}`;

    const targetAttr = hasTarget ? "" : ' target="_blank"';
    const relAttr = hasRel ? "" : ' rel="noreferrer"';

    return `<a ${classAttr}${targetAttr}${relAttr}>`;
  });
}

const COVER_BASE = "https://img.rss.com/spacepodden/320/";

export default function EpisodeFlipCard({
  episode,
  interactive = true,
  className = "",
  showAudio = true,
}: EpisodeFlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const coverSrc = episode.episode_cover ? `${COVER_BASE}${episode.episode_cover}` : null;
  const episodeLabel =
    episode.itunes_episode != null ? `Episode ${episode.itunes_episode}` : "Episode";
  const seasonLabel =
    episode.itunes_season != null && episode.itunes_episode != null
      ? `Season ${episode.itunes_season}, Episode ${episode.itunes_episode}`
      : null;
  const durationLabel = formatDuration(episode.itunes_duration);
  const dateLabel = formatDate(episode.pub_date);
  const descriptionHtml = formatDescriptionHtml(episode.description);
  const description = toPlainText(episode.description);

  const toggle = () => {
    if (!interactive) return;
    setFlipped((v) => !v);
  };

  return (
    <div
      className={`relative h-[65vh] max-h-[750px] w-full ${interactive ? "cursor-pointer" : "cursor-default"} select-none ${className}`}
      style={{ perspective: "1400px" }}
      onClick={toggle}
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl bg-egg text-moody overflow-hidden   shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {coverSrc ? (
            <div className="relative h-[60%] w-full overflow-hidden bg-moody/5">
              <Image
                src={coverSrc}
                alt={episode.title}
                fill
                sizes="480px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-52 w-full bg-moody/10" />
          )}

          <div className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-moody/70">
              <span>{episodeLabel}</span>
            </div>
            <h3
              className="text-[1.15rem] font-semibold leading-tight"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {episode.title}
            </h3>

            {showAudio && episode.episode_asset_url ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <audio
                    controls
                    controlsList="nodownload"
                    className="w-full text-moody"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <source src={episode.episode_asset_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="text-[0.75rem] uppercase tracking-[0.08em] text-moody/60">
                  Click the card to read more
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-moody text-egg  overflow-hidden border-2 border-egg/10 px-5 py-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col gap-4 h-full">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-egg/70">Details</p>
              <h3 className="text-[1.15rem] font-semibold leading-tight mt-1">{episode.title}</h3>
            </div>

            {description ? (
              <div className="rounded-lg bg-egg/5 text-egg text-[0.98rem] leading-relaxed whitespace-pre-line max-h-[30rem] h-[40vh] overflow-auto p-3 border border-egg/10">
                <div className="text-[0.7rem] uppercase tracking-[0.08em] text-egg/60 mb-2">
                  Scroll for full description
                </div>
                <div
                  className="space-y-2"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </div>
            ) : (
              <p className="text-egg/60 text-sm">No additional description available.</p>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              {seasonLabel ? (
                <Badge label={seasonLabel} />
              ) : (
                <Badge label={episodeLabel} />
              )}
              {durationLabel ? <Badge label={durationLabel} /> : null}
              {dateLabel ? <Badge label={dateLabel} /> : null}
            </div>

            <div className="text-[0.75rem] uppercase tracking-[0.08em] text-egg/60">
              Click the card to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-egg text-moody px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-[0.08em]">
      {label}
    </span>
  );
}
