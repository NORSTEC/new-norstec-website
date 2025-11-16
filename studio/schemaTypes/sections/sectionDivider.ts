import { defineType, defineField } from 'sanity'
import { ColorPreview } from '../ui/ColorPreview'

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
            description: 'Color used for this divider line.',
        }),
    ],

    preview: {
        select: {
            hex: 'color.color.hex',
            label: 'color.name',
        },
        prepare({ hex, label }) {
            return {
                title: 'Divider',
                subtitle: hex ? `${label} - ${hex}` : 'No color selected',
                media: () => ColorPreview({ hex }),
            }
        },
    },
})