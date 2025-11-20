import {PortableTextBlock} from "next-sanity";


export interface SectionInitiatives {
    _type: "sectionInitiatives";
    _id: string;
    title: string;
    body?: PortableTextBlock[];
    initiatives: {
        _key: string;
        _ref: string;
        _type: "reference";
    }[];
}