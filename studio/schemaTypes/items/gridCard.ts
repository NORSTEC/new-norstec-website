import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'gridCard',
    title: 'Grid Card',
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
            description: 'Short body text for the card.',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})