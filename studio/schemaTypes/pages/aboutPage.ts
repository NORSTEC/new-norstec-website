import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'aboutPage',
    title: 'About page',
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
                        {type: 'sectionNapkin'},
                        {type: 'sectionBarList'},
                        {type: 'sectionTable'},
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {title: 'title'},
        prepare({title}) {
            return {
                title: title || 'About page',
            }
        },
    },
})