import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionTeam } from "@/types/sections/sectionTeam";
import { SectionHero } from "@/types/sections/sectionHero";
import { VintageStripesSection } from "@/types/items/vintageStripes";

export type TeamPageSection = SectionTextImage | SectionTeam | SectionHero | VintageStripesSection;

export interface TeamPage {
  _type: "teamPage";
  _id: string;
  sections: TeamPageSection[];
}
