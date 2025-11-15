import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionHeaderText',
    title: 'Header + Text Section',
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
        defineField({
            name: 'link',
            title: 'Link',
            type: 'link',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
    },
})