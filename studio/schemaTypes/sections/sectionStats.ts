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
            description: 'Optional heading shown above the statistics grid. Leave empty if you do not want a section header.',
        }),

        defineField({
            name: 'colorToken',
            title: 'Accent Color',
            type: 'reference',
            to: [{ type: 'colorToken' }],
            description:
                'Choose the accent color used for the left vertical bars in this stats section.',
        }),

        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            description:
                'Add one or more statistic items. Each item contains a value, caption and icon.',
            of: [{ type: 'reference', to: [{ type: 'statItem' }] }],
            validation: (Rule) =>
                Rule.min(1).warning('A stats section usually contains at least one item.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            count: 'items.length',
        },
        prepare({ title, count }) {
            const displayTitle = title && title.trim() !== ''
                ? title
                : 'Stats Section'

            return {
                title: displayTitle,
                subtitle: count ? `${count} stats` : 'No items',
            }
        },
    },
})