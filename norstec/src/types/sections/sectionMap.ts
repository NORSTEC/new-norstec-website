import {PortableTextBlock} from "next-sanity";
import {Organization} from "@/types/items/organization";

export interface SectionMap {
    _type: "sectionMap";
    _id: string;
    title?: string;
    body: PortableTextBlock[];
    organizations: Organization[];
}