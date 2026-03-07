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
import { SectionSummitSponsors } from "@/types/sections/summit/sectionSummitSponsors";
import { VintageStripesSection } from "@/types/items/vintageStripes";
import {SectionBusinessContact} from "@/types/sections/summit/sectionBusinessContact";
import {SectionInitiativeAdditionalPage} from "@/types/sections/summit/sectionInitiativeAdditionalPage";
import { SummitProgramItem } from "@/types/sections/summit/sectionSummitProgram";

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
    | SectionSummitSponsors
    | SectionBusinessContact
    | SectionInitiativeAdditionalPage
    | VintageStripesSection;

interface InitiativeSubPageBase {
    _id: string;
    title: string;
    slug: {
        current: string;
    };
    initiative?: {
        _id: string;
        title: string;
        slug: {
            current: string;
        };
    };
}

export interface InitiativeContentSubPage extends InitiativeSubPageBase {
    _type: "initiativePage";
    sections: InitiativeSubPageSection[];
}

export interface SummitProgramSubPage extends InitiativeSubPageBase {
    _type: "summitProgramPage";
    subtitle?: string;
    items: SummitProgramItem[];
    sections?: InitiativeSubPageSection[];
}

export type InitiativeSubPage = InitiativeContentSubPage | SummitProgramSubPage;
