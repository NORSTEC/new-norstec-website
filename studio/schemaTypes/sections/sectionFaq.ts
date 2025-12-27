import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'sectionFaq',
    title: 'FAQ Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Main heading for this FAQ section.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Questions',
            type: 'array',
            description:
                'Add one or more frequently asked questions. Each FAQ item contains a question and answer.',
            of: [{type: 'reference', to: [{type: 'faqItem'}]}],
            validation: Rule =>
                Rule.min(1).warning('FAQ sections normally contain at least one question.'),
        }),

        defineField({
            name: 'showStripesCornerTopRight',
            title: 'Show top-right corner stripes',
            type: 'boolean',
            description: 'Display the animated corner stripes in the top-right.',
        }),

        defineField({
            name: 'showStripesCornerBottomRight',
            title: 'Show bottom-right corner stripes',
            type: 'boolean',
            description: 'Display the animated corner stripes in the bottom-right.',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            items: 'items',
        },
        prepare({title, items}) {
            const count = items?.length || 0
            return {
                title: title || 'FAQ Section',
                subtitle: count ? `${count} question${count > 1 ? 's' : ''}` : 'No questions added',
            }
        },
    },
})
