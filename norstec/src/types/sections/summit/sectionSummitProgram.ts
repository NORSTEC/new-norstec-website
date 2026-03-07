import { PortableTextBlock } from "next-sanity";
import { Image } from "@/types/image/image";

export type SummitProgramItemImage = {
  _key?: string;
  image?: Image | {
    asset?: {
      _ref?: string;
      _id?: string;
      url?: string | null;
    };
    crop?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    } | null;
    hotspot?: {
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    } | null;
  } | null;
  alt?: string;
  externalUrl?: string;
};

export type SummitProgramItem = {
  _key: string;
  title: string;
  startTime: string;
  endTime: string;
  name?: string;
  description?: PortableTextBlock[];
  isBreak?: boolean;
  images?: SummitProgramItemImage[];
  speakerlogos?: SummitProgramItemImage[];
};

export interface SectionSummitProgram {
  _type: "sectionSummitProgram";
  _id: string;
  title?: string;
  subtitle?: string;
  items: SummitProgramItem[];
}
