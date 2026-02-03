export interface SectionMediaItem {
  _type: "mediaItem";
  _id: string;
  videoUrl: string;
  caption?: string;
}

export interface SectionMedia {
  _type: "sectionMedia";
  _id: string;
  title: string;
  items: SectionMediaItem[];
}
