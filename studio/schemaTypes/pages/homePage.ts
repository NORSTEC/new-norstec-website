import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Home page',
    type: 'document',
    fields: [

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