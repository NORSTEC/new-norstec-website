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
                { type: 'largeQuote' },
                { type: 'largeImage' },
                { type: 'spanningText' },
                { type: 'doubleImage' },
                { type: 'doubleImageCollage' },
                { type: 'projectsShowcase' },
                { type: 'instagramEmbed' },
                {
                    type: 'reference',
                    name: 'joinCardRef',
                    title: 'Join Card Section',
                    to: [{ type: 'joinCard' }],
                    options: { disableNew: true },
                },
                {
                    type: 'reference',
                    name: 'forSponsorsCardRef',
                    title: 'For Sponsors Section',
                    to: [{ type: 'forSponsorsCard' }],
                    options: { disableNew: true },
                },
            ],
        }),
    ],
})
