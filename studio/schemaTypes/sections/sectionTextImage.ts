import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionTextImage',
    title: 'Text + Image Section',
    type: 'document',

    fields: [
        defineField({
            name: 'layout',
            title: 'Layout style',
            type: 'string',
            options: {
                list: [
                    {
                        title: 'Side-by-side (title, text and image in one row)',
                        value: 'split',
                    },
                    {
                        title: 'Title above (text and image in two columns below)',
                        value: 'stacked',
                    },
                ],
                layout: 'radio',
            },
            initialValue: 'split',
            description: 'Choose how the title, text and image should be positioned.',
        }),

        defineField({
            name: 'showBreadcrumb',
            title: 'Show breadcrumb',
            type: 'boolean',
            initialValue: false,
            description: 'Enable to show a breadcrumb path above the title.',
        }),

        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'showIcon',
            title: 'Show star icon',
            type: 'boolean',
            initialValue: false,
            description: 'Enable to display the default star icon next to the title.',
        }),

        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'imageAlt',
            title: 'Image alt text',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'link',
            title: 'Link',
            type: 'link',
            description: 'Optional internal or external link at the bottom.',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'image',
            showIcon: 'showIcon',
        },
        prepare({ title, media }) {
            return {
                title,
                media,
            }
        },
    },
})