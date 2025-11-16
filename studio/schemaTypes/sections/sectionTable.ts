/**
 * Represents a configurable table with defined columns and rows.
 * Data is stored in three parts:
 *
 * - title: Optional heading shown above the table.
 * - columns: An ordered list of column definitions. Each column has:
 *     label: Header text
 *     type: "string", "number" or "url"
 *     urlFallback: Optional fallback label for empty URL cells
 *
 * - rows: Each row contains a `cells` array, where the number of cells always
 *         matches the number of columns. Schema validation guarantees:
 *         - one cell per column
 *         - valid URLs for url-columns
 *         - numeric values for number-columns
 *         - non-empty text for string-columns
 *
 * Frontend:
 * - Use `columns[i]` to render headers.
 * - Use `rows[j].cells[i]` as the cell value for the corresponding column.
 * - For URL columns: if the value is empty, use columns[i].urlFallback.
 */

import {defineType, defineField} from 'sanity'
import {TableRowCellsInput} from "../ui/TableRowCellsInput";

export default defineType({
    name: 'sectionTable',
    title: 'Table Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Heading shown above the table.',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'columns',
            title: 'Columns',
            type: 'array',
            description:
                'Define the table columns in display order. You can use 3–5 columns.',
            of: [
                defineField({
                    name: 'column',
                    title: 'Column',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Header label',
                            type: 'string',
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: 'type',
                            title: 'Column type',
                            type: 'string',
                            options: {
                                list: [
                                    {title: 'Text', value: 'string'},
                                    {title: 'Number', value: 'number'},
                                    {title: 'URL', value: 'url'},
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'string',
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: 'urlFallback',
                            title: 'URL fallback label',
                            type: 'string',
                            description:
                                'Used for URL columns when there is no website (e.g. “No website”).',
                            hidden: ({parent}) => parent?.type !== 'url',
                        }),
                    ],
                }),
            ],
            validation: Rule =>
                Rule.min(3)
                    .max(5)
                    .warning('The table is designed for 3–5 columns.'),
        }),

        defineField({
            name: 'rows',
            title: 'Rows',
            type: 'array',
            description:
                'Each row must have one cell for every column, in the same order.',
            of: [
                defineField({
                    name: 'row',
                    title: 'Row',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'cells',
                            title: 'Cells',
                            type: 'array',
                            of: [{ type: 'string' }],
                            components: {
                                input: TableRowCellsInput,
                            },
                            validation: Rule =>
                                Rule.custom((cells, context) => {
                                    const doc = context?.document as any
                                    const columns = doc?.columns || []
                                    const columnCount = columns.length

                                    if (!columnCount) {
                                        return 'Define columns before adding rows.'
                                    }

                                    if (!Array.isArray(cells)) {
                                        return 'Row must have one cell per column.'
                                    }

                                    if (cells.length !== columnCount) {
                                        return `Row must have exactly ${columnCount} cells (currently ${
                                            cells.length
                                        }).`
                                    }

                                    for (let i = 0; i < columnCount; i++) {
                                        const col = columns[i]
                                        const val = cells[i]

                                        const label = col?.label || `Column ${i + 1}`

                                        // URL
                                        if (col?.type === 'url') {
                                            if (val && !/^https?:\/\/.+/i.test(String(val))) {
                                                return `Cell in column “${label}” must be a valid URL starting with http:// or https://.`
                                            }
                                            continue
                                        }

                                        // Tall
                                        if (col?.type === 'number') {
                                            if (!val || String(val).trim() === '') {
                                                return `Cell in column “${label}” cannot be empty.`
                                            }
                                            if (isNaN(Number(val))) {
                                                return `Cell in column “${label}” must be a number.`
                                            }
                                            continue
                                        }

                                        // Tekst
                                        if (!val || String(val).trim() === '') {
                                            return `Cell in column “${label}” cannot be empty.`
                                        }
                                    }

                                    return true
                                }),
                        }),
                    ],

                    preview: {
                        select: {
                            cells: 'cells',
                        },
                        prepare({ cells }) {
                            const vals = (cells || []) as string[]

                            const [first, second, third] = vals
                            const title = first || 'Table row'

                            const restCount = vals.length > 3 ? vals.length - 3 : 0

                            const subtitleParts = [second, third].filter(Boolean).join(' - ')
                            const subtitle =
                                restCount > 0
                                    ? `${subtitleParts}${subtitleParts ? ' - ' : ''}+${restCount} more`
                                    : subtitleParts || undefined

                            return {
                                title,
                                subtitle,
                            }
                        },
                    },
                }),
            ],
            validation: Rule =>
                Rule.min(1).warning('A table usually contains at least one row.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            columns: 'columns',
            rows: 'rows',
        },
        prepare({title, columns, rows}) {
            const colCount = columns?.length || 0
            const rowCount = rows?.length || 0

            return {
                title: title || 'Table Section',
                subtitle: `${colCount} columns - ${rowCount} rows`,
            }
        },
    },
})