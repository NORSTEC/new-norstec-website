import { Image } from "@/types/image/image";

export interface SectionImage {
  _type: "sectionImage";
  _id: string;
  images: {
    image: Image;
    imageAlt: string;
  }[];
  mirrored?: boolean;
}
