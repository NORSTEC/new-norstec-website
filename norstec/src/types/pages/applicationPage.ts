import { Image } from "@/types/image/image";
import { PortableTextBlock } from "next-sanity";

export interface ApplicationPage {
    _id: string;
    _type: "application";
    title: string;
    slug: { current: string };

    teamOrDepartment?: string;
    positionType?: "normal_verv" | "high_intensity" | "tbd";
    applicationDeadline?: string;
    locations?: string[];
    language?: string[];

    landingImage?: Image & { alt?: string };

    position?: {
        name: string;
        description?: PortableTextBlock[];
    };

    aboutRole?: PortableTextBlock[];

    responsibilities?: string[];
    requiredQualifications?: string[];

    niceToHave?: {
        title: string;
        items?: string[];
    };

    howWeWork?: {
        title: string;
        content?: PortableTextBlock[];
    };

    expectations?: {
        title: string;
        items?: string[];
    };

    benefits?: string[];

    contactPersons?: {
        _id: string;
        name: string;
        email?: string;
        phone?: string;
        photo?: Image;
        photoAlt?: string;
    }[];
}
