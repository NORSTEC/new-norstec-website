import { Image } from "@/types/image/image";
import { ArticleSection } from "@/types/sections/articleSection";

export interface Article {
  _type: "article";
  _id: string;
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  excerpt?: string;
  coverImage: Image;
  coverAlt: string;
  publishedAt: string;
  sections?: ArticleSection[];
}
