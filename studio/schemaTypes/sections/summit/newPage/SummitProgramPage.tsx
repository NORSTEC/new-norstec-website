import { defineField, defineType } from "sanity";

export default defineType({
    name: "summitProgramPage",
    title: "Summit nytt Program",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
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
            name: "subtitle",
            title: "Subtitle",
            type: "string",
            description:
                "Optional helper text under the section title (e.g. 'Click a row for more details').",
        }),

        defineField({
            name: "items",
            title: "Program items",
            type: "array",
            of: [
                defineField({
                    name: "programItem",
                    title: "Program item",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),

                        defineField({
                            name: "startTime",
                            title: "Start time",
                            type: "string",
                            description: "Format HH:MM (24h).",
                            validation: (Rule) => Rule.required(),
                        }),

                        defineField({
                            name: "endTime",
                            title: "End time",
                            type: "string",
                            description: "Format HH:MM (24h).",
                            validation: (Rule) => Rule.required(),
                        }),

                        defineField({
                            name: "name",
                            title: "Name",
                            type: "string",
                            description: "Speaker or owner of the session.",
                        }),

                        defineField({
                            name: "images",
                            title: "Images",
                            description:
                                "Optional one or two portrait images shown with the description.",
                            type: "array",
                            validation: (Rule) => Rule.max(2),
                            of: [
                                defineField({
                                    name: "imageItem",
                                    title: "Image item",
                                    type: "object",
                                    fields: [
                                        defineField({
                                            name: "image",
                                            title: "Image",
                                            type: "image",
                                            options: { hotspot: true },
                                            validation: (Rule) => Rule.required(),
                                        }),
                                        defineField({
                                            name: "alt",
                                            title: "Alt text",
                                            type: "string",
                                        }),
                                    ],

                                    preview: {
                                        select: {
                                            media: "image",
                                            title: "alt",
                                        },
                                        prepare({ media, title }) {
                                            return {
                                                title: title || "Program image",
                                                media,
                                            };
                                        },
                                    },
                                }),
                            ],
                        }),

                        defineField({
                            name: "description",
                            title: "Description",
                            type: "portableText",
                        }),

                        defineField({
                            name: "isBreak",
                            title: "Is break",
                            type: "boolean",
                            initialValue: false,
                            description:
                                "Mark this item as a break; name is optional.",
                        }),
                    ],

                    preview: {
                        select: {
                            title: "title",
                            start: "startTime",
                            end: "endTime",
                            isBreak: "isBreak",
                        },
                        prepare({ title, start, end, isBreak }) {
                            return {
                                title: isBreak
                                    ? `Break: ${title || "—"}`
                                    : title || "Untitled",
                                subtitle:
                                    [start, end].filter(Boolean).join(" - ") ||
                                    "No time set",
                            };
                        },
                    },
                }),
            ],
        }),
    ],

    preview: {
        select: {
            title: "title",
            items: "items",
        },
        prepare({ title, items }) {
            const count = items?.length || 0;
            return {
                title: title || "Program",
                subtitle: count
                    ? `${count} item${count === 1 ? "" : "s"}`
                    : "Empty program",
            };
        },
    },
});
