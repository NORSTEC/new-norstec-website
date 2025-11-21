export interface SectionStats {
    _type: "sectionStats";
    _id: string;
    title?: string;
    items: Array<{
        _type: "reference";
        _ref: string;
    }>;
}