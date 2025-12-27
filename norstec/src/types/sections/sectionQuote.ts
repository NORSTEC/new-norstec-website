import { PortableTextBlock } from "next-sanity";

export interface SectionQuote {
    _type: "sectionQuote";
    _id: string;
    header: string;
    body?: PortableTextBlock[];
}
