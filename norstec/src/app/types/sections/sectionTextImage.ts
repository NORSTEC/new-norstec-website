import {PortableTextBlock} from "next-sanity";
import {Image} from "@/app/types/image/image";

export interface SectionTextImage {
    _type: "sectionTextImage";
    _id: string;
    title: string;
    body: PortableTextBlock[];
    images: {
        image: Image;
        imageAlt: string;
    }[];

    link?: {
        _type: "link";
        href: string;
        label?: string;
    };
}