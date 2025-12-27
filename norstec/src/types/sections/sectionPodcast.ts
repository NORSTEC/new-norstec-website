export interface SectionPodcast {
  _type: "sectionPodcast";
  _id: string;
  title: string;
  limit?: number;
  showSpotifyLink: boolean;
  spotifyUrl?: string;
}
