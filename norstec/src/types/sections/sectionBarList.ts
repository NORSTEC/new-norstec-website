export interface SectionBarList {
  _type: "sectionBarList";
  _id: string;
  title?: string;
  items: Array<{
    _id: string;
    value: string;
    caption?: string;
  }>;
}
