import {defineField, defineType} from "sanity";

export default defineType({
    name: "sectionBusinessContact",
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
            name: "mirrored",
            title: "Mirror layout?",
            type: "boolean",
            description: "Moves stripes to the left and flips the layout direction.",
            initialValue: false,
        }),
        defineField({
            name: "members",
            title: "Contact persons",
            type: "array",
            description: "Select one or more team members to show as contacts.",
            of: [
                {
                    type: "reference",
                    to: [{ type: "teamMember" }],
                },
            ],
            validation: (Rule) => Rule.min(1),
        }),
        defineField({
            name: "buttonLabel",
            title: "Button label",
            type: "string",
            description: "Text shown on the button under the body.",
        }),

        defineField({
            name: 'buttonHref',
            title: 'Button link',
            type: 'string',
            description:
                'Internal path (/for-bedrifter), external URL (https://…), or email (mailto:hello@example.com)',

            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const label = (context.parent as { buttonLabel?: string } | undefined)
                        ?.buttonLabel

                    if ((value && !label) || (!value && label)) {
                        return 'Add both a button label and link.'
                    }

                    if (!value) return true

                    const isInternal = value.startsWith('/')
                    const isExternal = /^https?:\/\//.test(value)
                    const isMailto = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

                    if (!isInternal && !isExternal && !isMailto) {
                        return 'Use /path, https://url, or mailto:email@example.com'
                    }

                    return true
                }),

        })

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
