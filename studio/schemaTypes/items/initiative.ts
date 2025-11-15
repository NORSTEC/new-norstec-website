import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'initiative',
    title: 'Initiative',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tag',
            title: 'Tag',
            type: 'string',
            description: 'Short label or category for the initiative.',
        }),
        defineField({
            name: 'summary',
            title: 'Summary',
            type: 'portableText',
            description: 'Short description of the initiative.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'cover',
            title: 'Cover image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverAlt',
            title: 'Cover image alt text',
            type: 'string',
            description: 'Describe the image for accessibility.',
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
            description: 'Add the sections that should appear on this initiative page, in order.',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type: 'sectionHero'},
                        {type: 'sectionTextImage'},
                        {type: 'sectionHeaderText'},
                        {type: 'sectionStats'},
                        {type: 'sectionIconStats'},
                        {type: 'sectionMap'},
                        {type: 'sectionTable'},
                        {type: 'sectionGridCards'},
                        {type: 'sectionCtaGrid'},
                        {type: 'sectionFaq'},
                        {type: 'sectionContact'},
                        {type: 'sectionTeam'},
                        {type: 'sectionInitiatives'},
                        {type: 'sectionJoin'},
                        {type: 'sectionMedia'},
                        {type: 'sectionNapkin'},
                        {type: 'sectionPodcast'},
                        {type: 'sectionDivider'},
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'tag',
            media: 'cover',
        },
    },
})