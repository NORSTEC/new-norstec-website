import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionTable',
    title: 'Table Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'columns',
            title: 'Columns',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Column headers in display order.',
            validation: (Rule) => Rule.min(1),
        }),
        defineField({
            name: 'rows',
            title: 'Rows',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tableRow' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            columnCount: 'columns.length',
            rowCount: 'rows.length',
        },
        prepare({ title, columnCount, rowCount }) {
            return {
                title,
                subtitle: `${columnCount || 0} columns • ${rowCount || 0} rows`,
            }
        },
    },
})