"use client";

import Image from "next/image";
import React from "react";
import { PodcastEpisode } from "@/types/items/podcast";

const COVER_BASE = "https://img.rss.com/spacepodden/320/";

type EpisodeCardProps = {
  episode: PodcastEpisode;
  accent?: "sun" | "beachball" | "copper" | "sky";
  flat?: boolean;
};

const PREVIEW_CHAR_LIMIT = 700;

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

function formatDescriptionHtml(html?: string) {
  if (!html) return "";

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
      ? attrs.replace(/class\s*=\s*["']?/, (m: string) => `${m}underline text-moody `)
      : `class="underline text-moody" ${attrs}`;

    const targetAttr = hasTarget ? "" : ' target="_blank"';
    const relAttr = hasRel ? "" : ' rel="noreferrer"';

    return `<a ${classAttr}${targetAttr}${relAttr}>`;
  });
}

function trimTrailingBreaks(html: string) {
  return html.replace(/(?:<br\s*\/?>\s*)+$/i, "").trim();
}

function toPlainText(html?: string) {
  if (!html) return "";

  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function trimAtStop(html: string) {
  const stops = ["Har du et spørsmål", "Timestamps", "timestamps"];
  for (const phrase of stops) {
    const idx = html.indexOf(phrase);
    if (idx !== -1) return html.slice(0, idx).trim();
  }
  return html;
}

// Mobile-first static card for episodes (stacked layout)
export default function EpisodeCard({ episode, accent = "sun", flat = false }: EpisodeCardProps) {
  const [expanded, setExpanded] = React.useState(false);
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
  const episodeLabel =
    episode.itunes_episode != null ? `Episode ${episode.itunes_episode}` : "Episode";

  const rawHtml = episode.description ?? "";
  const stopTrimmedHtml = trimAtStop(rawHtml);
  const stopWasApplied = stopTrimmedHtml !== rawHtml;

  const basePreviewHtml = stopTrimmedHtml || rawHtml;
  const previewPlain = toPlainText(basePreviewHtml);
  const overLength = previewPlain.length > PREVIEW_CHAR_LIMIT;
  const previewText = overLength
    ? `${previewPlain.slice(0, PREVIEW_CHAR_LIMIT).trimEnd()}…`
    : previewPlain;

  const previewHtml = overLength
    ? trimTrailingBreaks(formatDescriptionHtml(previewText.replace(/\n/g, "<br/>")))
    : trimTrailingBreaks(formatDescriptionHtml(basePreviewHtml));

  const fullHtml = trimTrailingBreaks(formatDescriptionHtml(rawHtml));
  const showReadMore = stopWasApplied || overLength;
  const accentClass =
    accent === "beachball"
      ? "from-beachball/15"
      : accent === "copper"
        ? "from-copper/15"
        : accent === "sky"
          ? "from-sky/15"
      : "from-sun/15";

  const containerClasses = [
    "group relative overflow-hidden lg:rounded-2xl bg-egg text-moody transition duration-300",
    flat
      ? "border border-transparent shadow-none hover:translate-y-0"
      : "border-2 border-moody/15 shadow-[0_25px_60px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]",
  ].join(" ");

  return (
    <article className={containerClasses}>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClass} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative flex flex-col gap-4 pt-5 lg:p-6">
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
            <p className="text-xs uppercase tracking-[0.12em] text-moody/70">{episodeLabel}</p>
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

        {episode.episode_asset_url ? (
          <audio
            controls
            controlsList="nodownload"
            className="w-full rounded-lg bg-transparent text-moody"
          >
            <source src={episode.episode_asset_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : null}

        {previewHtml ? (
          <div
            className="text-[0.98rem] leading-relaxed text-moody/80 whitespace-pre-line space-y-2"
            dangerouslySetInnerHTML={{ __html: expanded ? fullHtml : previewHtml }}
          />
        ) : null}

        {showReadMore && (
          <button
            type="button"
            className="self-start text-moody underline text-sm -mt-3"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </article>
  );
}
