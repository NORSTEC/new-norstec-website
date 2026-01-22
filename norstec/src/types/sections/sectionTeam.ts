import { PortableTextBlock } from "next-sanity";
import { TeamMember, TeamRole } from "@/types/items/teamMember";

export interface SectionTeamMember {
  _key: string;
  member?: TeamMember;
  role?: TeamRole;
}

export interface SectionTeam {
  _type: "sectionTeam";
  _id: string;
  title: string;
  body?: PortableTextBlock[];
  members?: SectionTeamMember[];
  showStripesCornerTopRight?: boolean;
  showStripesCornerBottomRight?: boolean;
  mobileGrid?: boolean;
}
