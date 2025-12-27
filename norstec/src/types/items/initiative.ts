import type { PortableTextBlock } from "next-sanity";
import { Image } from "@/types/image/image";

export interface Initiative {
  _key: string;
  _type: "initiative";
  _id: string;
  title: string;
  tag?: string;
  summary: PortableTextBlock[];
  cover: Image;
  coverAlt: string;
  slug: {
    _type: "slug";
    current: string;
  };
  sections: {
    _type: "reference";
    _ref: string;
  }[];
}
