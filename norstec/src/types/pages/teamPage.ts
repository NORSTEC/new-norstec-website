import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionTeam } from "@/types/sections/sectionTeam";
import { SectionHero } from "@/types/sections/sectionHero";

export type TeamPageSection = SectionTextImage | SectionTeam | SectionHero;

export interface TeamPage {
  _type: "teamPage";
  _id: string;
  sections: TeamPageSection[];
}
