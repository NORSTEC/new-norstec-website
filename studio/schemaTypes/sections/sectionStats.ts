import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionStats',
    title: 'Stats Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'color',
            options: {
                disableAlpha: true,
            },
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'statItem' }] }],
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
                subtitle: count ? `${count} stats` : 'No items',
            }
        },
    },
})