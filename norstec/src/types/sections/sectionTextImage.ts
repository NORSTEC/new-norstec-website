import {PortableTextBlock} from "next-sanity";
import {Image} from "@/types/image/image";

export interface SectionTextImage {
    _type: "sectionTextImage";
    _id: string;
    title: string;
    body: PortableTextBlock[];
    mirrored?: boolean;
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