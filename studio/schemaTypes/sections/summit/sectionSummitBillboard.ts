import { defineType, defineField } from "sanity";

export const sectionSummitBillboard = defineType({
    name: "sectionSummitBillboard",
    title: "Section Summit Billboard",
    type: "object",
    fields: [
        defineField({
            name: "text",
            title: "Text",
            type: "string",
        }),
        defineField({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
                defineField({
                    name: "type",
                    title: "Link Type",
                    type: "string",
                    options: {
                        list: [
                            { title: "Internal", value: "internal" },
                            { title: "External", value: "external" },
                        ],
                        layout: "radio",
                    },
                }),
                defineField({
                    name: "internal",
                    title: "Internal Reference",
                    type: "reference",
                    to: [{ type: "summitProgramPage" }],
                    hidden: ({ parent }) => parent?.type !== "internal",
                }),
                defineField({
                    name: "external",
                    title: "External URL",
                    type: "url",
                    hidden: ({ parent }) => parent?.type !== "external",
                }),
            ],
        }),
    ],
});