import {SectionTextImage} from "@/app/types/sections/sectionTextImage";
import {SectionStats} from "@/app/types/sections/sectionStats";
import {SectionMap} from "@/app/types/sections/sectionMap";
import {SectionTable} from "@/app/types/sections/sectionTable";
import {SectionInitiatives} from "@/app/types/sections/sectionInitiatives";

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
