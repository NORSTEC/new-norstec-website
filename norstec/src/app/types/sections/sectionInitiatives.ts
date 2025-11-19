import {PortableTextBlock} from "next-sanity";


export interface SectionInitiatives {
    _type: "sectionInitiatives";
    _id: string;
    title: string;
    body?: PortableTextBlock[];
    initiatives: Array<{
        _type: "reference";
        _ref: string;
    }>;
}