import {SectionInitiatives} from "@/types/sections/sectionInitiatives";

export interface InitiativesPage {
    _type: "initiativesPage";
    _id: string;
    title?: string;
    sections: SectionInitiatives[];
}