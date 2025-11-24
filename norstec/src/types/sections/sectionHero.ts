import {Image} from "@/types/image/image";


export interface SectionHero {
    _type: "sectionHero";
    _id: string;
    heroTitle?: string;
    heroImage: Image;
}