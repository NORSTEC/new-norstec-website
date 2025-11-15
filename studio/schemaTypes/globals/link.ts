import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
    ],
})