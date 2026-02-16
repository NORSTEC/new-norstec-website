import {Application} from "@/types/application/application";


export interface SectionApplications {
    _type: "sectionApplications";
    _id: string;
    title?: string;
    applications: Application[];
}
