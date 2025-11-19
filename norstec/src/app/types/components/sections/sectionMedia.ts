export interface SectionMedia {
    _type: "sectionMedia";
    _id: string;
    title: string;
    items: Array<{
        _type: "reference";
        _ref: string;
    }>;
}