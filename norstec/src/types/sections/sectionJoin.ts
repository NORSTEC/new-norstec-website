import { PortableTextBlock } from "next-sanity";
import { Organization } from "@/types/items/organization";

export interface SectionJoin {
  _type: "sectionJoin";
  _id: string;
  title: string;
  body?: PortableTextBlock[];
  organizations?: Organization[];
}
