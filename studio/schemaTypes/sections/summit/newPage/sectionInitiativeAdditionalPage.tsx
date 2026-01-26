import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'initiativePage',
    title: 'Initiative Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            description: 'Add the sections that should appear on this page, in order.',
            of: [
                {
                    type: 'reference',
                    to: [
                        { type: 'sectionHero' },
                        { type: 'sectionTextImage' },
                        { type: 'sectionBarList' },
                        { type: 'sectionTable' },
                        { type: 'sectionStats' },
                        { type: 'sectionImage' },
                        { type: 'sectionFaq' },
                        { type: 'sectionTeam' },
                        { type: 'sectionMedia' },
                        { type: 'sectionPodcast' },
                        { type: 'sectionQuote' },
                        { type: 'sectionDivider' },
                        { type: 'sectionBusinessContact' },
                        {
                            type: 'sectionSummitTextImage',
                            options: {
                                filter: ({ document }) => {
                                    const isSummit = document?.slug?.current === 'summit'
                                    return isSummit ? undefined : { filter: 'false' }
                                },
                            },
                        },
                        {
                            type: 'sectionSummitTimer',
                            options: {
                                filter: ({ document }) => {
                                    const isSummit = document?.slug?.current === 'summit'
                                    return isSummit ? undefined : { filter: 'false' }
                                },
                            },
                        },
                        {
                            type: 'sectionSummitHost',
                            options: {
                                filter: ({ document }) => {
                                    const isSummit = document?.slug?.current === 'summit'
                                    return isSummit ? undefined : { filter: 'false' }
                                },
                            },
                        },
                        {
                            type: 'sectionSummitInfo',
                            options: {
                                filter: ({ document }) => {
                                    const isSummit = document?.slug?.current === 'summit'
                                    return isSummit ? undefined : { filter: 'false' }
                                },
                            },
                        },
                        {
                            type: 'sectionSummitProgram',
                            options: {
                                filter: ({ document }) => {
                                    const isSummit = document?.slug?.current === 'summit'
                                    return isSummit ? undefined : { filter: 'false' }
                                },
                            },
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: 'title',
        },
    },
})
