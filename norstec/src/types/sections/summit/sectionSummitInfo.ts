import { PortableTextBlock } from "next-sanity";
import { Image } from "@/types/image/image";

export interface SectionSummitInfo {
  _type: "sectionSummitInfo";
  _id: string;
  title?: string;
  body?: PortableTextBlock[];
  image?: Image;
  imageAlt?: string;
  captionTitle?: string;
  captionName?: string;
  captionEmail?: string;
  captionPhone?: string;
}
