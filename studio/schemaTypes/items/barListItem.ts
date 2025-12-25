import { defineType, defineField } from 'sanity'

export default  defineType({
    name: 'barListItem',
    title: 'Bar List Item',
    type: 'document',
    fields: [
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'Example: "Ambition", "Passion", "30+',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'portableText',
          description: 'Short explanation of the item (Only shown on mobile).',
        }),
    ],
    preview: {
        select: {
            title: 'value',
        },
    },
})