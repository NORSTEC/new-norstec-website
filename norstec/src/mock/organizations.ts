import type { Organization } from "@/types/items/organization";

export const MOCK_ORGANIZATIONS: Organization[] = [
    {
        id: "trondheim-incubator",
        name: "NTNU Space Incubator",
        description: "Inkubatorprogrammene i Trondheim for tidligfase-space-prosjekter.",
        type: "incubator",
        x: 430,
        y: 620,
    },
    {
        id: "trondheim-non-inc",
        name: "Orbit NTNU",
        description: "Studentrakett- og satellittmiljø ved NTNU.",
        type: "non-incubator",
        x: 445,
        y: 640,
    },
    {
        id: "oslo-non-inc",
        name: "Orbit UiO",
        description: "Space-fokusert studentforening ved Universitetet i Oslo.",
        type: "non-incubator",
        x: 470,
        y: 980,
    },
    // …osv
];