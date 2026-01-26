import { SectionHero } from "@/types/sections/sectionHero";
import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionBarList } from "@/types/sections/sectionBarList";
import { SectionTable } from "@/types/sections/sectionTable";
import { SectionStats } from "@/types/sections/sectionStats";
import { SectionImage } from "@/types/sections/sectionImage";
import { SectionQuote } from "@/types/sections/sectionQuote";
import { SectionFaq } from "@/types/sections/sectionFaq";
import { SectionPodcast } from "@/types/sections/sectionPodcast";
import { SectionTeam } from "@/types/sections/sectionTeam";
import { SectionSummitTextImage } from "@/types/sections/summit/sectionSummitTextImage";
import { SectionSummitTimer } from "@/types/sections/summit/sectionSummitTimer";
import { SectionSummitHost } from "@/types/sections/summit/sectionSummitHost";
import { SectionSummitInfo } from "@/types/sections/summit/sectionSummitInfo";
import { SectionSummitProgram } from "@/types/sections/summit/sectionSummitProgram";
import { VintageStripesSection } from "@/types/items/vintageStripes";
import {SectionBusinessContact} from "@/types/sections/summit/sectionBusinessContact";

export type InitiativeSubPageSection =
    | SectionHero
    | SectionTextImage
    | SectionBarList
    | SectionTable
    | SectionStats
    | SectionImage
    | SectionQuote
    | SectionFaq
    | SectionPodcast
    | SectionTeam
    | SectionSummitTextImage
    | SectionSummitTimer
    | SectionSummitHost
    | SectionSummitInfo
    | SectionSummitProgram
    | SectionBusinessContact
    | VintageStripesSection;

export interface InitiativeSubPage {
    _type: "initiativePage";
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    sections: InitiativeSubPageSection[];

    initiative?: {
        _id: string;
        title: string;
        slug: {
            current: string;
        };
    };
}
