import {defineField, defineType} from "sanity";

export default defineType({
    name: "sectionSummitTextImage",
    title: "Summit | Text + Image",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "body",
            title: "Body",
            type: "portableText",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {hotspot: true},
        }),

        defineField({
            name: "imageAlt",
            title: "Image alt text",
            type: "string",
            description: "Describe the image for accessibility.",
            hidden: ({parent}) => !parent?.image,
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    if (context.parent?.image && !value) return "Add alt text for the image.";
                    return true;
                }),
        }),

        defineField({
            name: "mirrored",
            title: "Mirror layout?",
            type: "boolean",
            description: "Moves stripes to the left and flips the layout direction.",
            initialValue: false,
        }),

        defineField({
            name: "buttonLabel",
            title: "Button label",
            type: "string",
            description: "Text shown on the button under the body.",
        }),

        defineField({
            name: "buttonHref",
            title: "Button link",
            type: "string",
            description: "Internal path (e.g. /for-bedrifter) or full URL.",
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const label = (context.parent as {buttonLabel?: string} | undefined)?.buttonLabel;
                    if ((value && !label) || (!value && label)) {
                        return "Add both a button label and link.";
                    }
                    return true;
                }),
        }),
    ],

    preview: {
        select: {
            title: "title",
            media: "image",
        },
        prepare({title, media}) {
            return {
                title,
                subtitle: "Summit text + image",
                media,
            };
        },
    },
});
