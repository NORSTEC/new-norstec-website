import {SectionTextImage} from "@/types/sections/sectionTextImage";
import {SectionBarList} from "@/types/sections/sectionBarList";
import {SectionMap} from "@/types/sections/sectionMap";
import {SectionTable} from "@/types/sections/sectionTable";
import {SectionInitiatives} from "@/types/sections/sectionInitiatives";

export type HomePageSection =
    | SectionTextImage
    | SectionBarList
    | SectionMap
    | SectionTable
    | SectionInitiatives;


export interface HomePage {
    _type: "homePage";
    _id: string;
    sections: HomePageSection[];
}
