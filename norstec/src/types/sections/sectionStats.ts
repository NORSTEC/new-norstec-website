import type { PortableTextBlock } from "next-sanity";

export interface SectionStats {
    _type: "sectionStats";
    _id: string;
    title?: string;
    fullStripes?: boolean;
    items: Array<{
        _key: string;
        numberValue?: number;
        textValue?: string;
        prefix?: "none" | "$" | "€" | "+" | "%";
        suffix?: "none" | "$" | "€" | "+" | "%";
        captionTitle?: string;
        caption?: PortableTextBlock[];
    }>;
}
