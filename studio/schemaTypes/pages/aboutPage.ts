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
                        {type: 'sectionHeaderText'},
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

        defineField({
            name: 'footer',
            title: 'Footer',
            type: 'reference',
            to: [{type: 'footer'}],
            validation: (Rule) => Rule.required(),
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