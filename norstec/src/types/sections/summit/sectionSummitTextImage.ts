import { PortableTextBlock } from "next-sanity";
import { Image } from "@/types/image/image";

export interface SectionSummitTextImage {
  _type: "sectionSummitTextImage";
  _id: string;
  title: string;
  body: PortableTextBlock[];
  mirrored?: boolean;
  image?: Image;
  imageAlt?: string;
  buttonLabel?: string;
  buttonHref?: string;
}
