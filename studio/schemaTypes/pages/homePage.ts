import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Home page',
    type: 'document',
    fields: [
        defineField({
            name: 'hero',
            title: 'Hero',
            type: 'sectionHero',
            description: 'Main hero section at the top of the page.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type: 'sectionTextImage'},
                        {type: 'sectionStats'},
                        {type: 'sectionMap'},
                        {type: 'sectionTable'},
                        {type: 'sectionCtaGrid'},
                        {type: 'sectionContact'},
                        {type: 'sectionInitiatives'},
                        {type: 'sectionMedia'},
                        {type: 'sectionPodcast'},
                    ],
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
        select: {
            title: 'title',
        },
        prepare({title}) {
            return {
                title: title || 'Home page',
            }
        },
    },
})