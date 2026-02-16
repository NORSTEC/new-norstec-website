import { Image } from "@/types/image/image";

export interface Location {
    _id: string;
    name: string;
    country?: string;
}

export interface RoleInfo {
    teamOrDepartment?: string;
    positionType?: "normal_verv" | "high_intensity" | "tbd";
    applicationDeadline?: string;
    locations?: Location[];
    language?: string[];
}

export interface Application {
    _id: string;
    _type: "application";
    title: string;
    slug: {
        current: string;
    };
    landingImage?: Image;
    roleInfo?: RoleInfo;
}
