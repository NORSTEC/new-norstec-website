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
            description: 'Optional heading displayed above the map section.',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            description: 'Text displayed left of the map',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})