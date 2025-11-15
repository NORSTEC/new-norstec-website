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
            type: 'color',
            options: {
                disableAlpha: true,
            },
            description: 'Select the color for this divider line.',
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