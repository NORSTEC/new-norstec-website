import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionBarList } from "@/types/sections/sectionBarList";
import { SectionMap } from "@/types/sections/sectionMap";
import { SectionTable } from "@/types/sections/sectionTable";
import { SectionInitiatives } from "@/types/sections/sectionInitiatives";
import { SectionImage } from "@/types/sections/sectionImage";
import { MetadataSection } from "@/types/metadata/metadata";
import { VintageStripesSection} from "@/types/items/vintageStripes";


export type HomePageSection =
  | SectionTextImage
  | SectionImage
  | SectionBarList
  | SectionMap
  | SectionTable
  | SectionInitiatives
  | VintageStripesSection;

export interface HomePage {
  _type: "homePage";
  _id: string;
  metadata?: MetadataSection;
  sections: HomePageSection[];
}
