export interface Episode {
  guid: string;
  title: string;
  description: string;
  itunes_episode: number;
  itunes_season: number;
  pub_date: Date;
  episode_cover: string;
  episode_asset_url: string;
  itunes_duration: number;
}

export type MediaType = "podcast" | "youtube" | "instagram" | "linkedin";

export interface FeedItem {
  id: string;
  type: MediaType;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  createdAt: Date;
}

export interface JuicerPost {
  id: string;
  full_url: string;
  image: string;
  message: string;
  external_created_at: Date;
  source: {source: MediaType};
}
