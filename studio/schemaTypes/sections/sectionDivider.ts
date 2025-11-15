import { defineType, defineField } from 'sanity'

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
        }),
    ],
    preview: {
        select: {
            hex: 'color.hex',
        },
        prepare({ hex }) {
            return {
                title: 'Divider',
                subtitle: hex || 'Default color',
            }
        }
    }
})