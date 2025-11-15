import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionCtaGrid',
    title: 'CTA Grid Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Optional heading displayed above the grid. Leave empty if this section does not need a title.',
        }),

        defineField({
            name: 'items',
            title: 'CTA items',
            type: 'array',
            description: 'Add one or more call-to-action items. These are displayed in a responsive grid.',
            of: [{ type: 'reference', to: [{ type: 'ctaItem' }] }],
            validation: (Rule) =>
                Rule.min(1).warning('A CTA grid normally contains at least one item.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            count: 'items.length',
        },
        prepare({ title, count }) {
            return {
                title: title || 'CTA Grid Section',
                subtitle: count ? `${count} items` : 'No items',
            }
        },
    },
})