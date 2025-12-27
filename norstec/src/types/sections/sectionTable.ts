export interface SectionTable {
  _type: "sectionTable";
  _id: string;

  title: string;

  columns: Array<{
    label: string;
    type: "string" | "number" | "url";
    urlFallback?: string;
  }>;

  rows: Array<{
    cells: string[];
  }>;

  showStripesCornerTopRight?: boolean;
  showStripesCornerBottomRight?: boolean;
}
