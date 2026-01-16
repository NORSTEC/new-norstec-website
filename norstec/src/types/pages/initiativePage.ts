import { Initiative } from "@/types/items/initiative";
import { SectionHero } from "@/types/sections/sectionHero";
import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionBarList } from "@/types/sections/sectionBarList";
import { SectionTable } from "@/types/sections/sectionTable";
import { SectionStats } from "@/types/sections/sectionStats";
import { SectionImage } from "@/types/sections/sectionImage";
import { SectionQuote } from "@/types/sections/sectionQuote";
import { SectionFaq } from "@/types/sections/sectionFaq";
import { SectionPodcast } from "@/types/sections/sectionPodcast";
import { SectionTeam } from "@/types/sections/sectionTeam";
import { SectionSummitTextImage } from "@/types/sections/summit/sectionSummitTextImage";

export type InitiativePageSection =
  | SectionHero
  | SectionTextImage
  | SectionBarList
  | SectionTable
  | SectionStats
  | SectionImage
  | SectionQuote
  | SectionFaq
  | SectionPodcast
  | SectionTeam
  | SectionSummitTextImage;

export interface InitiativePage extends Omit<Initiative, "sections"> {
  sections: InitiativePageSection[];
}
