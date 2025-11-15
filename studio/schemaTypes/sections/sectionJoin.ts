import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionJoin',
    title: 'Join Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: { layout: 'grid' },
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})