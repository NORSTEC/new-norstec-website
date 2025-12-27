import { Initiative } from "@/types/items/initiative";
import { SectionHero } from "@/types/sections/sectionHero";
import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionBarList } from "@/types/sections/sectionBarList";
import { SectionTable } from "@/types/sections/sectionTable";
import { SectionStats } from "@/types/sections/sectionStats";
import { SectionImage } from "@/types/sections/sectionImage";
import { SectionQuote } from "@/types/sections/sectionQuote";

export type InitiativePageSection =
    | SectionHero
    | SectionTextImage
    | SectionBarList
    | SectionTable
    | SectionStats
    | SectionImage
    | SectionQuote;

export interface InitiativePage extends Omit<Initiative, "sections"> {
    sections: InitiativePageSection[];
}
