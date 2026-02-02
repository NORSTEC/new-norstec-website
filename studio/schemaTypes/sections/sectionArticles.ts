import { defineType, defineField } from "sanity";

export default defineType({
    name: "sectionArticles",
    title: "Articles Section",
    type: "document",

    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            description: "Heading shown above the articles grid.",
        }),
        defineField({
            name: "articles",
            title: "Articles",
            type: "array",
            of: [{ type: "reference", to: [{ type: "article" }] }],
            validation: (Rule) => Rule.min(1).warning("Select at least one article"),
        }),
    ],

    preview: {
        select: {
            title: "title",
            articles: "articles",
        },
        prepare({ title, articles }) {
            const count = articles?.length || 0;
            return {
                title: title || "Articles Section",
                subtitle: count ? `${count} article${count > 1 ? "s" : ""}` : "No articles",
            };
        },
    },
});
