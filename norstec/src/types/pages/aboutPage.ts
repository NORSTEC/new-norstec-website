import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionIconStats } from "@/types/sections/sectionIconStats";
import { SectionHeaderImage } from "@/types/sections/sectionHeaderImage";
import { SectionNapkin } from "@/types/sections/sectionNapkin";
import { SectionGridCards } from "@/types/sections/sectionGridCards";
import { SectionStats } from "@/types/sections/sectionStats";
import { SectionTable } from "@/types/sections/sectionTable";
import { SectionCtaGrid } from "@/types/sections/sectionCtaGrid";
import { SectionContact } from "@/types/sections/sectionContact";

export type AboutPageSection =
    | SectionTextImage
    | SectionIconStats
    | SectionHeaderImage
    | SectionNapkin
    | SectionGridCards
    | SectionStats
    | SectionTable
    | SectionCtaGrid
    | SectionContact;
export interface AboutPage {
    _type: "aboutPage";
    _id: string;
    sections: AboutPageSection[];
}
