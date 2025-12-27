import type { PortableTextBlock } from "next-sanity";

export interface FaqItem {
  _id: string;
  _type: "faqItem";
  question: string;
  answer: PortableTextBlock[];
}
