import { PortableTextBlock } from "next-sanity";
import { SectionTeamMember } from "@/types/sections/sectionTeam";

export interface SectionInitiativeAdditionalPage {
  _type: "sectionInitiativeAdditionalPage";
  _id: string;
  title?: string;
  description?: PortableTextBlock[] | string;
  body?: PortableTextBlock[];
  buttonLabel?: string;
  buttonHref?: string;
  members?: SectionTeamMember[];
}
