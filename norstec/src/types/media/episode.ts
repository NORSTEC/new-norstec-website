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