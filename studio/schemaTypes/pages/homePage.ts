import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Home page',
    type: 'document',
    fields: [
        defineField({
            name: "metadata",
            title: "Metadata",
            type: "metadata",
            description:
                "SEO, Open Graph, Twitter, robots osv. Gjelder hele siden. Trenger som regel ikke å bli endret på.",
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type: 'sectionHero'},
                        {type: 'sectionTextImage'},
                        {type: 'sectionMap'},
                        {type: 'sectionTable'},
                        {type: 'sectionInitiatives'},
                        {type: 'sectionMedia'},
                        {type: 'sectionPodcast'},
                        {type: 'sectionImage'},
                        {type: 'sectionDivider'}
                    ],
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Home page',
            }
        },
    },
})