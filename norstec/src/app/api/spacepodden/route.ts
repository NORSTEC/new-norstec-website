import { NextResponse } from "next/server";

const PODCAST_ENDPOINT = "https://apollo.rss.com/podcasts/spacepodden/episodes";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "6";
  const page = searchParams.get("page") ?? "1";

  try {
    const response = await fetch(`${PODCAST_ENDPOINT}?limit=${limit}&page=${page}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: corsHeaders,
    });
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
