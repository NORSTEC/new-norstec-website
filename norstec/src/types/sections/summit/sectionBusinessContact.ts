import { PortableTextBlock } from "next-sanity";
import { TeamMember } from "@/types/items/teamMember";

export interface SectionBusinessContactMember {
    _key: string;
    member?: TeamMember;
}

export interface SectionBusinessContact {
    _type: "sectionBusinessContact";
    _id: string;

    title: string;
    body: PortableTextBlock[];

    mirrored?: boolean;

    members?: SectionBusinessContactMember[];

    buttonLabel?: string;
    buttonHref?: string;
}
