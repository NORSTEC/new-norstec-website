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
            description: 'The question shown in the FAQ list.',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'portableText',
            description: 'The answer that will appear when the question is expanded.',
            validation: Rule => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: 'question',
        },
        prepare({ title }) {
            return {
                title: title || 'Untitled FAQ',
            }
        },
    },
})