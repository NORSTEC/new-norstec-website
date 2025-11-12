import {Hero} from "@/app/types/components/hero";

export type LandingPageSection = Hero


export interface LandingPage {
    _type: "landingPage";
    _id: string;
    title: string;
    sections: LandingPageSection[];
}
