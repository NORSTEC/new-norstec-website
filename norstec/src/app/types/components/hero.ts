import {Image} from "@/app/types/image/image";


export interface Hero {
    _key: string;
    _type: "hero";
    heroTitle: string;
    heroImage: Image;
}
