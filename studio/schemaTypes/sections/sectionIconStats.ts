import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionIconStats',
    title: 'Icon Stats Section',
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
            title: 'Items',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'iconStatItem' }] }],
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'color',
            options: {
                disableAlpha: true,
            },
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
                subtitle: count ? `${count} icon stats` : 'No items',
            }
        },
    },
})