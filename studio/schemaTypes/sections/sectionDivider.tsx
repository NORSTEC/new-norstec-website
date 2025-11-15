import { defineType, defineField } from 'sanity'
import React from 'react'

export default defineType({
    name: 'sectionDivider',
    title: 'Divider',
    type: 'document',

    fields: [
        defineField({
            name: 'color',
            title: 'Color',
            type: 'reference',
            to: [{ type: 'colorToken' }],
            description:
                'Color used for this divider line. Reuse an existing color token or create a new one.',
        }),
    ],

    preview: {
        select: {
            hex: 'color.hex',
        },
        prepare({ hex }) {
            return {
                title: 'Divider',
                subtitle: hex || 'No color selected',

                media: () => (
                    <div
                        className="divider-preview"
                        style={{ backgroundColor: hex || "#ccc" }}
                    />
        ),
        }
        },
    },
})