export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || 6;
    const page = searchParams.get("page") || 1;

    const response = await fetch(
      `https://apollo.rss.com/podcasts/spacepodden/episodes?limit=${limit}&page=${page}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
