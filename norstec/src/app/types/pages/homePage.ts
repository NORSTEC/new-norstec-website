import {SectionHero} from "@/app/types/components/sections/sectionHero";
import {SectionTextImage} from "@/app/types/components/sections/sectionTextImage";
import {SectionStats} from "@/app/types/components/sections/sectionStats";
import {SectionMap} from "@/app/types/components/sections/sectionMap";
import {SectionTable} from "@/app/types/components/sections/sectionTable";
import {SectionCtaGrid} from "@/app/types/components/sections/sectionCtaGrid";
import {SectionContact} from "@/app/types/components/sections/sectionContact";
import {SectionInitiatives} from "@/app/types/components/sections/sectionInitiatives";
import {SectionMedia} from "@/app/types/components/sections/sectionMedia";
import {SectionPodcast} from "@/app/types/components/sections/sectionPodcast";


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
