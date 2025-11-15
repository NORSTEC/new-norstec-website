import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'faqItem',
    title: 'FAQ Item',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'portableText',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'question',
        },
    },
})