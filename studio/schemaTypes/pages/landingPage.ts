import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                { type: 'Hero' },
                { type: 'largeImage' },
                { type: 'spanningText' },
                { type: 'doubleImage' },
                { type: 'doubleImageCollage' },
                { type: 'projectsShowcase' },
                { type: 'instagramEmbed' },
            ],
        }),
    ],
})
