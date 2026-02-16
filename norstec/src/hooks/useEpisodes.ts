import { Episode } from "@/types/media";
import { useEffect, useState } from "react";

export function useEpisodes({ page = 1, limit = 6 }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/episodes?limit=${limit}&page=${page}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch episodes");
        }

        const data = await res.json();
        setEpisodes(data.episodes || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching episodes");
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [page, limit]);

  return { episodes, loading, error };
}
