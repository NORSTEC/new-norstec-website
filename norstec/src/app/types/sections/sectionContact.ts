import {PortableTextBlock} from "next-sanity";


export interface SectionContact {
    _type: "sectionContact";
    _id: string;
    title: string;
    body?: PortableTextBlock[];
}