import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionContact',
    title: 'Contact Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact info',
            type: 'reference',
            to: [{ type: 'contactInfo' }],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            email: 'contactInfo.email',
        },
        prepare({ title, email }) {
            return {
                title,
                subtitle: email || 'Contact info',
            }
        },
    },
})