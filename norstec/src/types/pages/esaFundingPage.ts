import { SectionHero } from "@/types/sections/sectionHero";
import { SectionTextImage } from "@/types/sections/sectionTextImage";
import { SectionFaq } from "@/types/sections/sectionFaq";
import { VintageStripesSection } from "@/types/items/vintageStripes";
import { SectionEsaFundingForm } from "@/types/sections/sectionEsaFundingForm";

export type EsaFundingPageSection =
  | SectionHero
  | SectionTextImage
  | SectionFaq
  | VintageStripesSection
  | SectionEsaFundingForm;

export interface EsaFundingPage {
  _type: "esaFundingPage";
  _id: string;
  sections: EsaFundingPageSection[];
}
