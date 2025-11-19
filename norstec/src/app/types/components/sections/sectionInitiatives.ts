import {PortableTextBlock} from "@/app/types/pages/homePage";

export interface SectionInitiatives {
    _type: "sectionInitiatives";
    _id: string;
    title: string;
    body?: PortableTextBlock[];
    initiatives: Array<{
        _type: "reference";
        _ref: string;
    }>;
}