import { defineType, defineField } from "sanity";

export default defineType({
    name: "sectionArticles",
    title: "Articles Section",
    type: "document",

    fields: [
        defineField({
            name: "articles",
            title: "Articles",
            type: "array",
            of: [{ type: "reference", to: [{ type: "article" }] }],
            validation: (Rule) => Rule.min(1).warning("Select at least one article"),
        }),
        defineField({
            name: "coverArticle",
            title: "Article cover image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverArticleAlt",
            title: "Article cover alt text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverYoutube",
            title: "YouTube cover image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverYoutubeAlt",
            title: "YouTube cover alt text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverInstagram",
            title: "Instagram cover image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverInstagramAlt",
            title: "Instagram cover alt text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverLinkedin",
            title: "LinkedIn cover image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverLinkedinAlt",
            title: "LinkedIn cover alt text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "useJuicerImages",
            title: "Use Juicer images when available",
            type: "boolean",
            initialValue: false,
            description: "If enabled, Juicer posts will use their original images instead of the fallback covers.",
        }),
    ],

    preview: {
        select: {
            articles: "articles",
        },
        prepare({ articles }) {
            const count = articles?.length || 0;
            return {
                title: "Articles Section",
                subtitle: count ? `${count} article${count > 1 ? "s" : ""}` : "No articles",
            };
        },
    },
});
