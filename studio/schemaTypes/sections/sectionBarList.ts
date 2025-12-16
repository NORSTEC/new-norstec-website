import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionBarList',
    title: 'Bar List Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description:
                'Optional heading shown above the list. Leave empty if you do not want a section header.',
        }),

        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            description:
                'Add one or more list items. Each item contains a header and caption',
            of: [{ type: 'reference', to: [{ type: 'statItem' }] }],
            validation: Rule =>
                Rule.length(4).warning('A section has to contain four list items.'),
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
                title && title.trim() !== '' ? title : 'Bar list Section'

            return {
                title: displayTitle,
                subtitle: count ? `${count} stat${count > 1 ? 's' : ''}` : 'No items',
            }
        },
    },
})