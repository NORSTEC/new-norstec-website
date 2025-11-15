import { defineType, defineField } from 'sanity'

export default  defineType({
    name: 'statItem',
    title: 'Statistic Item',
    type: 'document',
    fields: [
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'Example: "450+", "1M", "8".',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Short explanation of the statistic.',
        }),
    ],
    preview: {
        select: {
            title: 'value',
            subtitle: 'subtitle',
        },
    },
})