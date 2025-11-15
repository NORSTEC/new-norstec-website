import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionMap',
    title: 'Map Section',
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
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})