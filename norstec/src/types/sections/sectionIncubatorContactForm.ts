import { PortableTextBlock } from "next-sanity";

export interface SectionIncubatorContactForm {
  _type: "sectionIncubatorContactForm";
  _id: string;
  title: string;
  body: PortableTextBlock[];
}
