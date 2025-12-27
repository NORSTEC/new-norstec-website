import type { FaqItem } from "@/types/items/faqItem";

export interface SectionFaq {
    _type: "sectionFaq";
    _id: string;
    title: string;
    items: FaqItem[];
    showStripesCornerTopRight?: boolean;
    showStripesCornerBottomRight?: boolean;
}
