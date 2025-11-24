import { Image } from "@/types/image/image";

export interface SectionHeaderImage {
    _type: "sectionHeaderImage";
    _id: string;

    title: string;

    image: Image;

    link?: {
        _type: "link";
        href: string;
        label?: string;
    };
}
