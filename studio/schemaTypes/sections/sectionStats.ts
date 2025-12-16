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
            description:
                'Optional heading shown above the statistics grid. Leave empty if you do not want a section header.',
        }),

        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            description:
                'Add one or more statistic items. Each item contains a value, caption and icon.',
            of: [{ type: 'reference', to: [{ type: 'statItem' }] }],
            validation: Rule =>
                Rule.length(4).warning('A stats section has to contain four items.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            items: 'items',
        },
        prepare({ title, items }) {
            const count = items?.length || 0
            const displayTitle =
                title && title.trim() !== '' ? title : 'Stats Section'

            return {
                title: displayTitle,
                subtitle: count ? `${count} stat${count > 1 ? 's' : ''}` : 'No items',
            }
        },
    },
})