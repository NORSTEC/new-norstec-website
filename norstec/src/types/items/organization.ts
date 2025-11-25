export interface Organization {
    id: string;
    name: string;
    description: string;
    type: "incubator" | "non-incubator";
    x: number;
    y: number;
}