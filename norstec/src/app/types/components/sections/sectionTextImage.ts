import {PortableTextBlock} from "next-sanity";
import {Image} from "@/app/types/image/image";



export interface SectionTextImage {
    _type: "sectionTextImage";
    _id: string;
    layout: "split" | "stacked";
    showBreadcrumb: boolean;
    title: string;
    showIcon: boolean;
    body: PortableTextBlock[];
    image: Image;
    imageAlt: string;
    link?: {
        _type: "link";
        href: string;
        label?: string;
    };
}