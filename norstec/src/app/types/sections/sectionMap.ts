import {PortableTextBlock} from "next-sanity";

export interface SectionMap {
    _type: "sectionMap";
    _id: string;
    title?: string;
    body: PortableTextBlock[];
}