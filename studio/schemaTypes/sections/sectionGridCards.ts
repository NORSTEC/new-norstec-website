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
            description: 'Optional title above the grid with cards',
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
            title: 'Cards',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'gridCard' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            count: 'items.length',
        },
        prepare({ title, count }) {
            return {
                title: title || "Grid Cards Section",
                subtitle: count ? `${count} cards` : 'No cards',
            }
        },
    },
})