import { Image } from "@/types/image/image";
import {PortableTextBlock} from "next-sanity";

export interface SectionNapkin {
    _type: "sectionNapkin";
    _id: string;

    title: string;
    subtitle?: PortableTextBlock[];

    image: Image;
    imageAlt: string;
}
