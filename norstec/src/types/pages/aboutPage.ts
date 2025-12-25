import { SectionBarList } from "@/types/sections/sectionBarList";
import {SectionHero} from "@/types/sections/sectionHero";
import {SectionTextImage} from "@/types/sections/sectionTextImage";

export type AboutPageSection =
    | SectionHero
    | SectionBarList
    | SectionTextImage

export interface AboutPage {
    _type: "aboutPage";
    _id: string;
    sections: AboutPageSection[];
}
