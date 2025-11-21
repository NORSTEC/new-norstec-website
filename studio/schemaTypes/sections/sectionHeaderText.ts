import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'sectionHeaderText',
    title: 'Header + Text Section',
    type: 'object',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            validation: Rule => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: 'title',
        },
        prepare({title}) {
            return {
                title: title || 'Header + Text Section',
            }
        },
    },
})
