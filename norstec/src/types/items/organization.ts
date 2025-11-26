export interface Organization {
    _id: string;
    name: string;
    description: string;
    location: string;
    type: "incubator" | "non-incubator";
    website: string;
    specialization: string;
    mapPosition: {
        x: number;
        y: number;
    };
}