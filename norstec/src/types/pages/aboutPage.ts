import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionNapkin } from "@/types/sections/sectionNapkin";
import { SectionBarList } from "@/types/sections/sectionBarList";
import { SectionTable } from "@/types/sections/sectionTable";

export type AboutPageSection =
    | SectionTextImage
    | SectionNapkin
    | SectionBarList
    | SectionTable
export interface AboutPage {
    _type: "aboutPage";
    _id: string;
    sections: AboutPageSection[];
}
