import { Image } from "@/types/image/image";

export interface SectionNapkin {
    _type: "sectionNapkin";
    _id: string;

    title: string;
    subtitle?: string;

    image: Image;
    imageAlt: string;
}
