import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionTeam } from "@/types/sections/sectionTeam";

export type TeamPageSection = SectionTextImage | SectionTeam;

export interface TeamPage {
  _type: "teamPage";
  _id: string;
  sections: TeamPageSection[];
}
