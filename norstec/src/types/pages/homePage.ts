import {SectionTextImage} from "@/types/sections/sectionTextImage";
import {SectionStats} from "@/types/sections/sectionStats";
import {SectionMap} from "@/types/sections/sectionMap";
import {SectionTable} from "@/types/sections/sectionTable";
import {SectionInitiatives} from "@/types/sections/sectionInitiatives";

export type HomePageSection =
    | SectionTextImage
    | SectionStats
    | SectionMap
    | SectionTable
    | SectionInitiatives;


export interface HomePage {
    _type: "homePage";
    _id: string;
    sections: HomePageSection[];
}
