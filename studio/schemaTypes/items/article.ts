import { defineType, defineField } from "sanity";

export default defineType({
    name: "article",
    title: "Article",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            rows: 3,
            description: "Short summary shown in article lists and previews.",
        }),
        defineField({
            name: "coverImage",
            title: "Cover image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverAlt",
            title: "Cover image alt text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "sections",
            title: "Sections",
            type: "array",
            description: "Add the sections that should appear on this article page, in order.",
            of: [
                {
                    type: "reference",
                    to: [
                        { type: "sectionHero" },
                        { type: "sectionTextImage" },
                        { type: "sectionBarList" },
                        { type: "sectionTable" },
                        { type: "sectionStats" },
                        { type: "sectionImage" },
                        { type: "sectionFaq" },
                        { type: "sectionTeam" },
                        { type: "sectionMedia" },
                        { type: "sectionQuote" },
                        { type: "sectionDivider" },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "slug.current",
            media: "coverImage",
        },
    },
});
