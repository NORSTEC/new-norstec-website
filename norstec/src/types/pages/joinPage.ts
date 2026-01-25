import { SectionHero } from "@/types/sections/sectionHero";
import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionJoin } from "@/types/sections/sectionJoin";
import { SectionTeam } from "@/types/sections/sectionTeam";
import { VintageStripesSection } from "@/types/items/vintageStripes";

export type JoinPageSection =
  | SectionHero
  | SectionTextImage
  | SectionJoin
  | SectionTeam
  | VintageStripesSection;

export interface JoinPage {
  _type: "joinPage";
  _id: string;
  sections: JoinPageSection[];
}
