import {SectionHero} from "@/app/types/sections/sectionHero";
import {SectionTextImage} from "@/app/types/sections/sectionTextImage";
import {SectionStats} from "@/app/types/sections/sectionStats";
import {SectionMap} from "@/app/types/sections/sectionMap";
import {SectionTable} from "@/app/types/sections/sectionTable";
import {SectionCtaGrid} from "@/app/types/sections/sectionCtaGrid";
import {SectionContact} from "@/app/types/sections/sectionContact";
import {SectionInitiatives} from "@/app/types/sections/sectionInitiatives";
import {SectionMedia} from "@/app/types/sections/sectionMedia";
import {SectionPodcast} from "@/app/types/sections/sectionPodcast";


export type HomePageSection =
    | SectionHero
    | SectionTextImage
    | SectionStats
    | SectionMap
    | SectionTable
    | SectionCtaGrid
    | SectionContact
    | SectionInitiatives
    | SectionMedia
    | SectionPodcast;


export interface HomePage {
    _type: "homePage";
    _id: string;
    sections: HomePageSection[];
}
