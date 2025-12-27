import type { PortableTextBlock } from "next-sanity";

export interface SectionStats {
  _type: "sectionStats";
  _id: string;
  title?: string;
  fullStripes?: boolean;
  countUp?: boolean;
  items: Array<{
    _key: string;
    numberValue?: number;
    textValue?: string;
    prefix?: "none" | "$" | "€" | "+" | "%" | "T" | "B";
    suffix?: "none" | "$" | "€" | "+" | "%" | "T" | "B";
    captionTitle?: string;
    caption?: PortableTextBlock[];
  }>;
}
