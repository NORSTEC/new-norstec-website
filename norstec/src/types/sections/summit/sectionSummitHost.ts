import { Image } from "@/types/image/image";

export interface SectionSummitHost {
  _type: "sectionSummitHost";
  _id: string;
  title?: string;
  hosts: {
    _key: string;
    name: string;
    title?: string;
    image?: Image;
    imageAlt?: string;
    bio?: string;
  }[];
}
