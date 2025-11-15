import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionGridCards',
    title: 'Grid Cards Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description:
                'Optional heading displayed above the grid. Leave empty if you do not want a section header.',
        }),

        defineField({
            name: 'colorToken',
            title: 'Accent color',
            type: 'reference',
            to: [{ type: 'colorToken' }],
            description:
                'Choose which saved color token this grid should use as accent color for the cards.',
        }),

        defineField({
            name: 'items',
            title: 'Cards',
            description:
                'Add the cards you want to appear in this grid. Each card contains a title and body text.',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'gridCard' }],
                },
            ],
            validation: (Rule) =>
                Rule.min(1).warning('A grid usually has at least one card.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            items: 'items',
        },
        prepare({ title, items }) {
            const count = items?.length || 0

            return {
                title: title || 'Grid Cards Section',
                subtitle: count ? `${count} card${count > 1 ? 's' : ''}` : 'No cards added',
            }
        },
    },
})