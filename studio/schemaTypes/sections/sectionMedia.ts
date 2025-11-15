import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionMedia',
    title: 'Media Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Media items',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'mediaItem' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            count: 'items.length',
        },
        prepare({ title, count }) {
            return {
                title,
                subtitle: count ? `${count} media items` : 'No items',
            }
        },
    },
})