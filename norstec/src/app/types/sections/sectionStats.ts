export interface SectionStats {
    _type: "sectionStats";
    _id: string;
    title?: string;
    colorToken?: {
        _type: "reference";
        _ref: string;
    };
    items: Array<{
        _type: "reference";
        _ref: string;
    }>;
}