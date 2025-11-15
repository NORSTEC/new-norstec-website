import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'tableRow',
    title: 'Table Row',
    type: 'document',
    fields: [
        defineField({
            name: 'cells',
            title: 'Cells',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'One value per column, in the same order as the table columns.',
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: {
            firstCell: 'cells.0',
        },
        prepare({ firstCell }) {
            return {
                title: firstCell || 'Table row',
            }
        },
    },
})