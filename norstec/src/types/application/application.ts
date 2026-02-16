import { Image } from "@/types/image/image";
import { PortableTextBlock } from "next-sanity";

export interface Location {
    _id: string;
    name: string;
    country?: string;
}

export interface Application {
    _id: string;
    _type: "application";

    title: string;
    slug: { current: string };

    landingImage?: Image;

    applicationDeadline?: string;

    position?: {
        name: string;
        description?: PortableTextBlock[];
    };

    teamOrDepartment?: string;
    positionType?: "normal_verv" | "high_intensity" | "tbd";
    locations?: string[];
    language?: string[];
}
