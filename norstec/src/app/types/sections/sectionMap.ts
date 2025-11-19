import {PortableTextBlock} from "@/app/types/pages/homePage";

export interface SectionMap {
    _type: "sectionMap";
    _id: string;
    title?: string;
    body: PortableTextBlock[];
}