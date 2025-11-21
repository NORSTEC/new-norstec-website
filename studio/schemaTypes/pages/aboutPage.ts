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
                        {type: 'sectionTextImage'},
                        {type: 'sectionIconStats'},
                        {type: 'sectionHeaderImage'},
                        {type: 'sectionNapkin'},
                        {type: 'sectionGridCards'},
                        {type: 'sectionStats'},
                        {type: 'sectionTable'},
                        {type: 'sectionCtaGrid'},
                        {type: 'sectionContact'},
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