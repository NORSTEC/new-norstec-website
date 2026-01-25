import { SectionInitiatives } from "@/types/sections/sectionInitiatives";
import { VintageStripesSection } from "@/types/items/vintageStripes";

export interface InitiativesPage {
  _type: "initiativesPage";
  _id: string;
  title?: string;
  sections: Array<SectionInitiatives | VintageStripesSection>;
}
