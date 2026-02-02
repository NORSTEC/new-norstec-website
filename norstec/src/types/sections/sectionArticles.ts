import { Article } from "@/types/items/article";
import { ArticleSection } from "@/types/sections/articleSection";
import { Image } from "@/types/image/image";

export interface SectionArticles {
  _type: "sectionArticles";
  _id: string;
  articles: Article[];
  coverArticle: Image;
  coverArticleAlt?: string;
  coverYoutube: Image;
  coverYoutubeAlt?: string;
  coverInstagram: Image;
  coverInstagramAlt?: string;
  coverLinkedin: Image;
  coverLinkedinAlt?: string;
}

export type { ArticleSection };
