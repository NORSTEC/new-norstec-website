import { PortableTextBlock } from "next-sanity";

export interface SectionEsaFundingForm {
  _type: "sectionEsaFundingForm";
  _id: string;
  title: string;
  body?: PortableTextBlock[];
  isOpen?: boolean;
  closedMessage?: string;
}
