import { SectionHero } from "@/types/sections/sectionHero";
import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionBarList } from "@/types/sections/sectionBarList";
import { SectionTable } from "@/types/sections/sectionTable";
import { SectionStats } from "@/types/sections/sectionStats";
import { SectionImage } from "@/types/sections/sectionImage";
import { SectionFaq } from "@/types/sections/sectionFaq";
import { SectionTeam } from "@/types/sections/sectionTeam";
import { SectionMedia } from "@/types/sections/sectionMedia";
import { SectionQuote } from "@/types/sections/sectionQuote";
import { VintageStripesSection } from "@/types/items/vintageStripes";

export type ArticleSection =
  | SectionHero
  | SectionTextImage
  | SectionBarList
  | SectionTable
  | SectionStats
  | SectionImage
  | SectionFaq
  | SectionTeam
  | SectionMedia
  | SectionQuote
  | VintageStripesSection;
