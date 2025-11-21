export interface SectionGridCards {
    _type: "sectionGridCards";
    _id: string;

    title?: string;

    items: Array<{
        _type: "reference";
        _ref: string;
    }>;
}
