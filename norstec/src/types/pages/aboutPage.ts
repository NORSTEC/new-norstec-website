import { SectionBarList } from "@/types/sections/sectionBarList";
import {SectionHero} from "@/types/sections/sectionHero";
import {SectionTextImage} from "@/types/sections/sectionTextImage";
import {SectionStats} from "@/types/sections/sectionStats";

export type AboutPageSection =
    | SectionHero
    | SectionBarList
    | SectionStats
    | SectionTextImage

export interface AboutPage {
    _type: "aboutPage";
    _id: string;
    sections: AboutPageSection[];
}
