import {PortableTextBlock} from "next-sanity";
import {Initiative} from "@/app/types/items/initiative";


export interface SectionInitiatives {
    _type: "sectionInitiatives";
    _id: string;
    title: string;
    body?: PortableTextBlock[];
    initiatives: Initiative[];
}