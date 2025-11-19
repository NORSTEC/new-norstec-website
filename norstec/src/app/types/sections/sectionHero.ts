import {SanityImage} from "@/app/types/pages/homePage";

export interface SectionHero {
    _type: "sectionHero";
    _id: string;
    heroTitle?: string;
    heroImage: SanityImage;
}