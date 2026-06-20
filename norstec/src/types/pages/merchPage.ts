import type {SectionHero} from "@/types/sections/sectionHero";

export interface MerchPage {
  _type: "merchPage";
  _id: string;
  sections: SectionHero[];
}
