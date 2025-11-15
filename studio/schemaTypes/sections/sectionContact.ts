import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'sectionContact',
    title: 'Contact Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Heading shown above the contact details.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            description: 'Intro text shown under the contact information.',
        }),
    ],
    preview: {
        select: {title: 'title'},
        prepare({title}) {
            return {
                title: title || 'Contact Section',
                subtitle: 'Uses global contact info',
            }
        },
    },
})