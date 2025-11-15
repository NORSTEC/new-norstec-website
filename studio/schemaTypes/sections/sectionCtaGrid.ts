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
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'ctaItem' }] }],
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
                subtitle: count ? `${count} CTAs` : 'No items',
            }
        },
    },
})