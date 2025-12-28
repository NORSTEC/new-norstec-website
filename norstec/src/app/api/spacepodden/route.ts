import { NextResponse } from "next/server";

const PODCAST_ENDPOINT = "https://apollo.rss.com/podcasts/spacepodden/episodes";
const API_MAX_PAGE_SIZE = 10; // rss.com endpoint errors when requesting more than ~10 items

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

async function fetchEpisodesPage(page: number, pageSize: number) {
  const response = await fetch(`${PODCAST_ENDPOINT}?limit=${pageSize}&page=${page}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch episodes: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return (data.episodes ?? []) as unknown[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit") ?? "6");
  const startPage = Number(searchParams.get("page") ?? "1");

  const requestedLimit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 6;
  const pageSize = Math.min(API_MAX_PAGE_SIZE, requestedLimit);

  try {
    // If within API limit, fetch once.
    if (requestedLimit <= API_MAX_PAGE_SIZE) {
      const episodes = await fetchEpisodesPage(startPage, pageSize);
      return NextResponse.json({ episodes }, { status: 200, headers: corsHeaders });
    }

    // Otherwise, fetch multiple pages until we satisfy requestedLimit or run out of pages.
    const episodes: unknown[] = [];
    let page = startPage;
    let remaining = requestedLimit;

    while (episodes.length < requestedLimit) {
      const batch = await fetchEpisodesPage(page, pageSize);
      episodes.push(...batch);
      remaining -= batch.length;

      if (batch.length < pageSize) break; // no more data
      page += 1;
    }

    return NextResponse.json(
      { episodes: episodes.slice(0, requestedLimit) },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error)?.message ?? "Unknown error fetching podcast episodes" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
