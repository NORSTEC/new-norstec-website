import { MetadataSection } from "@/types/metadata/metadata";
import { SectionHero } from "@/types/sections/sectionHero";
import { SectionArticles } from "@/types/sections/sectionArticles";
import { ArticleSection } from "@/types/sections/articleSection";
import { Image } from "@/types/image/image";
import { VintageStripesSection } from "@/types/items/vintageStripes";

export type ArticlePageSection = SectionHero | SectionArticles | VintageStripesSection;

export interface ArticlePage {
  _type: "articlePage";
  _id: string;
  metadata?: MetadataSection;
  sections: ArticlePageSection[];
}

export interface ArticleDetailPage {
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
  sections: ArticleSection[];
}
