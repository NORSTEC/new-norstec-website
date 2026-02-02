import { Article } from "@/types/items/article";
import { ArticleSection } from "@/types/sections/articleSection";

export interface SectionArticles {
  _type: "sectionArticles";
  _id: string;
  title?: string;
  articles: Article[];
}

export type { ArticleSection };
