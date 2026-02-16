import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'sectionApplications',
    title: 'Applications Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Open Positions',
        }),

        defineField({
            name: 'applications',
            title: 'Applications',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'application' }],
                },
            ],
        }),
    ],

    preview: {
        select: { title: 'title' },
    },
})
