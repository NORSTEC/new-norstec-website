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
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'imageAlt',
            title: 'Image alt text',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})