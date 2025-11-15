import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'initiativesPage',
    title: 'Initiatives page',
    type: 'document',
    fields: [
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'sectionInitiatives'}],
                },
            ],
        }),

        defineField({
            name: 'footer',
            title: 'Footer',
            type: 'reference',
            to: [{type: 'footer'}],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {title: 'title'},
        prepare({title}) {
            return {
                title: title || 'Initiatives page',
            }
        },
    },
})