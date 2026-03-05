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
                            name: "speakerlogos",
                            title: "Logos / Speaker images",
                            description:
                                "Optional logos or profile images with links (e.g. company page or LinkedIn).",
                            type: "array",
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
                                            name: "linkType",
                                            title: "Link type",
                                            type: "string",
                                            options: {
                                                list: [
                                                    { title: "External URL", value: "external" },
                                                ],
                                                layout: "radio",
                                            },
                                            initialValue: "external",
                                        }),

                                        defineField({
                                            name: "externalUrl",
                                            title: "External URL",
                                            type: "url",
                                            hidden: ({ parent }) => parent?.linkType !== "external",
                                        }),
                                    ],

                                    preview: {
                                        select: {
                                            media: "image",
                                            linkType: "linkType",
                                            url: "externalUrl",
                                        },
                                        prepare({ media, linkType, url }) {
                                            return {
                                                title:
                                                    linkType === "external"
                                                        ? url || "External link"
                                                        : "Internal link",
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