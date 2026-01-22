import { PortableTextBlock } from "next-sanity";

export type SummitProgramItem = {
  _key: string;
  title: string;
  startTime: string;
  endTime: string;
  name?: string;
  description?: PortableTextBlock[];
  isBreak?: boolean;
};

export interface SectionSummitProgram {
  _type: "sectionSummitProgram";
  _id: string;
  title?: string;
  subtitle?: string;
  items: SummitProgramItem[];
}
