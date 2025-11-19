export interface SectionCtaGrid {
    _type: "sectionCtaGrid";
    _id: string;

    title?: string;
    items: Array<{
        _type: "reference";
        _ref: string;
    }>;
}