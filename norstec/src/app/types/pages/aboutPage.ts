import { SectionTextImage } from "@/app/types/sections/sectionTextImage";
import { SectionIconStats } from "@/app/types/sections/sectionIconStats";
import { SectionHeaderImage } from "@/app/types/sections/sectionHeaderImage";
import { SectionNapkin } from "@/app/types/sections/sectionNapkin";
import { SectionGridCards } from "@/app/types/sections/sectionGridCards";
import { SectionStats } from "@/app/types/sections/sectionStats";
import { SectionTable } from "@/app/types/sections/sectionTable";
import { SectionCtaGrid } from "@/app/types/sections/sectionCtaGrid";
import { SectionContact } from "@/app/types/sections/sectionContact";

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
