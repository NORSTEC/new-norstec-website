import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionTextImage',
    title: 'Text + Image Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'mirrored',
            title: 'Mirror layout?',
            type: 'boolean',
            description: 'Mirrors the layout',
            initialValue: false,
        }),

        defineField({
            name: 'images',
            title: 'Carousel of Images',
            type: 'array',
            description: 'Here you can display an array of images.',
            validation: Rule => Rule.min(3).required(),
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                            validation: Rule => Rule.required(),
                        },
                        {
                            name: 'imageAlt',
                            title: 'Image alt text',
                            type: 'string',
                            validation: Rule => Rule.required(),
                        }
                    ]
                }
            ]
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
            media: 'images.0.image',
        },
        prepare({ title, media }) {
            return {
                title,
                media,
            }
        },
    },
})