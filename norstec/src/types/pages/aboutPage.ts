import { SectionBarList } from "@/types/sections/sectionBarList";
import {SectionHero} from "@/types/sections/sectionHero";
import {SectionTextImage} from "@/types/sections/sectionTextImage";
import {SectionStats} from "@/types/sections/sectionStats";
import {SectionTable} from "@/types/sections/sectionTable";

export type AboutPageSection =
    | SectionHero
    | SectionBarList
    | SectionStats
    | SectionTextImage
    | SectionTable

export interface AboutPage {
    _type: "aboutPage";
    _id: string;
    sections: AboutPageSection[];
}
