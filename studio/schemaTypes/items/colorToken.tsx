import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'colorToken',
    title: 'Color token',
    type: 'document',

    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Readable name, e.g. “Brand purple”, “Highlight yellow”.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'color',
            title: 'Color',
            type: 'color',
            options: {
                disableAlpha: true,
            },
            validation: Rule => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: 'name',
            key: 'key',
            hex: 'color.hex',
        },
        prepare({title, key, hex}) {
            return {
                title: title || 'Color',
                subtitle: key ? `${key} • ${hex}` : hex,
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