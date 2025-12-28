export interface PodcastEpisode {
  guid: string;
  title: string;
  description?: string;
  pub_date?: string;
  itunes_season?: number;
  itunes_episode?: number;
  itunes_duration?: number;
  episode_asset_url?: string;
  episode_cover?: string;
}

export interface PodcastResponse {
  episodes?: PodcastEpisode[];
  total?: number;
  page?: number;
  limit?: number;
}
