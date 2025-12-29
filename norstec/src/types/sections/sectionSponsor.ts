import { Image } from "@/types/image/image";

export interface ImageItem {
    _key: string;
    image: Image;
    alt: string;
    url?: string;
}

export interface SectionSponsor {
    _type: "sectionSponsor";
    title: string;
    images: ImageItem[];
}

export interface SponsorPage {
    _type: "sponsorPage";
    title: string;
    description?: string;
    sectionOne: SectionSponsor;
    sectionTwo: SectionSponsor;
    sectionThree: SectionSponsor;
    sectionFour: SectionSponsor;
}
