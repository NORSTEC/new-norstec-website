import {PortableTextBlock} from "@/app/types/pages/homePage";

export interface SectionContact {
    _type: "sectionContact";
    _id: string;
    title: string;
    body?: PortableTextBlock[];
}