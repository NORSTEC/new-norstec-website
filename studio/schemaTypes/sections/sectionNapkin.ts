import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionNapkin',
    title: 'Napkin Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Main heading shown above the napkin image.',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'portableText',
            description: 'Optional short text displayed under the title. Can be used for context.',
        }),

        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'Upload the napkin image.',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'imageAlt',
            title: 'Image alt text',
            type: 'string',
            description: 'Describe the image for accessibility',
            validation: Rule =>
                Rule.required().warning('Alt text is important for accessibility.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})