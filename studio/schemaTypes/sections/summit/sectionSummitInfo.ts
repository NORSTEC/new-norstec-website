import {defineField, defineType} from "sanity";

export default defineType({
    name: "sectionSummitInfo",
    title: "Summit | Info",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "portableText",
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {hotspot: true},
        }),
        defineField({
            name: "imageAlt",
            title: "Alt text",
            type: "string",
            hidden: ({parent}) => !parent?.image,
        }),
        defineField({
            name: "captionName",
            title: "Caption name",
            type: "string",
        }),
        defineField({
            name: "captionTitle",
            title: "Caption title",
            type: "string",
        }),
        defineField({
            name: "captionEmail",
            title: "Caption email",
            type: "string",
        }),
        defineField({
            name: "captionPhone",
            title: "Caption phone",
            type: "string",
        }),
    ],
    preview: {
        select: {
            title: "title",
            caption: "captionName",
        },
        prepare({title, caption}) {
            return {
                title: title || caption || "Profile",
                subtitle: caption ? `Contact: ${caption}` : "Summit profile",
            };
        },
    },
});
