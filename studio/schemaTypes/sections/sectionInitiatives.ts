import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionInitiatives',
    title: 'Initiatives Section',
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
            name: 'initiatives',
            title: 'Initiatives',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'initiative' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            count: 'initiatives.length',
        },
        prepare({ title, count }) {
            return {
                title,
                subtitle: count ? `${count} initiatives` : 'No initiatives',
            }
        },
    },
})