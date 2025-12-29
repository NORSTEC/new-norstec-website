import { Rule } from "sanity";

export const sponsorPage = {
    name: "sponsorPage",
    title: "Sponsor Page",
    type: "document",

    fields: [
        {
            name: "title",
            title: "Page Title",
            type: "string",
            description: "Main title shown on the Sponsor page",
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "description",
            title: "Page Description",
            type: "text",
            description: "Intro text shown at the top of the Sponsor page",
            rows: 3,
        },
        {
            name: "displayName",
            title: "Display Name",
            type: "string",
            description: 'Name shown in Sanity Studio (e.g. "Sponsors")',
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "sectionOne",
            title: "Section One",
            type: "sectionSponsor",
        },
        {
            name: "sectionTwo",
            title: "Section Two",
            type: "sectionSponsor",
        },
        {
            name: "sectionThree",
            title: "Section Three",
            type: "sectionSponsor",
        },
        {
            name: "sectionFour",
            title: "Section Four",
            type: "sectionSponsor",
        },
    ],

    preview: {
        select: {
            title: "displayName",
            subtitle: "title",
        },
    },
};
