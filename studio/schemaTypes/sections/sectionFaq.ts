import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionFaq',
    title: 'FAQ Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Questions',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'faqItem' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            count: 'items.length',
        },
        prepare({ title, count }) {
            return {
                title,
                subtitle: count ? `${count} questions` : 'No questions',
            }
        },
    },
})