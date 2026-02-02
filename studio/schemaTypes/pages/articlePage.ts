import { defineField, defineType } from "sanity";

export default defineType({
    name: "articlePage",
    title: "Articles page",
    type: "document",
    fields: [
        defineField({
            name: "metadata",
            title: "Metadata",
            type: "metadata",
            description: "SEO and social settings for the articles page.",
            options: { collapsible: true, collapsed: true },
        }),
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        { type: "sectionHero" },
                        { type: "sectionArticles" },
                        { type: "sectionDivider" },
                    ],
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Articles page",
            };
        },
    },
});
