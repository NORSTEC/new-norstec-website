import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'teamPage',
    title: 'Team page',
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
                        {type: 'sectionDivider'},
                        {type: 'sectionTeam'},
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {title: 'title'},
        prepare({title}) {
            return {
                title: title || 'Team page',
            }
        },
    },
})