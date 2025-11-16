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
            description: 'Displayed above the statistics. Example: “Our Impact”.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'items',
            title: 'Icon statistics',
            type: 'array',
            description:
                'Add one or more statistics. Each stat consists of an icon, a value and a caption.',
            of: [{ type: 'reference', to: [{ type: 'iconStatItem' }] }],
            validation: (Rule) => Rule.min(1).warning('This section normally contains at least one statistic.'),
        }),

        defineField({
            name: 'accentColor',
            title: 'Accent color',
            type: 'reference',
            to: [{ type: 'colorToken' }],
            description:
                'Color used for the icon and value (number) in this stats section. Choose an existing color or create a new one.',
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
                title: title || 'Icon Stats Section',
                subtitle: count
                    ? `${count} stat${count > 1 ? 's' : ''}`
                    : 'No statistics added',
            }
        },
    }
})