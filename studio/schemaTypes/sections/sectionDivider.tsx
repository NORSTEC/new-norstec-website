import {defineType, defineField} from 'sanity'
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
            hex: 'color.color.hex',
            label: 'color.name',
        },
        prepare({hex, label}) {
            const subtitle = hex
                ? `${label || 'Color token'} - ${hex}`
                : 'No color selected'

            return {
                title: 'Divider',
                subtitle,
                media: () => (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: hex || '#ccc',
                        }}
                    />
                ),
            }
        },
    },
})