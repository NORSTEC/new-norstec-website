import type { PortableTextBlock } from "next-sanity";

export interface SectionStats {
    _type: "sectionBarList";
    _id: string;
    title?: string;
    items: Array<{
        _id: string;
        value: string;
        caption?: PortableTextBlock[];
    }>;
}
