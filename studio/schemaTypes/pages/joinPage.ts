import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'joinPage',
    title: 'Join page',
    type: 'document',
    fields: [
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'sectionJoin'}],
                },
            ],
        }),
    ],
    preview: {
        select: {title: 'title'},
        prepare({title}) {
            return {
                title: title || 'Join page',
            }
        },
    },
})