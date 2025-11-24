export interface SectionIconStats {
    _type: "sectionIconStats";
    _id: string;

    title: string;

    items: Array<{
        _type: "reference";
        _ref: string;
    }>;

    accentColor?: {
        _type: "reference";
        _ref: string;
    };
}
