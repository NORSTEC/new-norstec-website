import { Rule } from "sanity";

export const sectionSponsor = {
    name: "sectionSponsor",
    title: "Sponsor Section",
    type: "object",
    fields: [
        {
            name: "title",
            title: "Section Title",
            type: "string",
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [
                {
                    name: "imageItem",
                    title: "Image Item",
                    type: "object",
                    fields: [
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: { hotspot: true },
                            validation: (rule: Rule) => rule.required(),
                        },
                        {
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                            validation: (rule: Rule) => rule.required(),
                        },
                        {
                            name: "url",
                            title: "Link URL",
                            type: "url",
                            description: "Where this image should link to",
                            validation: (rule: Rule) =>
                                rule.uri({
                                    scheme: ["http", "https"],
                                }),
                        },
                    ],
                },
            ],
        },
    ],
};
