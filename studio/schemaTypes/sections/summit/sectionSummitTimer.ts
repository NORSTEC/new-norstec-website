import {defineField, defineType} from "sanity";

export default defineType({
    name: "sectionSummitTimer",
    title: "Summit | Timer",
    type: "document",
    fields: [
        defineField({
            name: "buttonLabel",
            title: "Button label",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "buttonHref",
            title: "Button link",
            type: "string",
            description: "URL (https://...) or internal path (e.g. /for-bedrifter)",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "buttonLabel",
        },
        prepare({title}) {
            return {
                title: title || "Summit timer",
                subtitle: "Summit timer + button",
            };
        },
    },
});
