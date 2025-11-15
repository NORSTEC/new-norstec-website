import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'teamRole',
    title: 'Team role',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Role title',
            type: 'string',
            description: 'For example: "Arrangementansvarlig", "Chief Information Officer", "Kommunikasjon/Web".',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'description',
        },
    },
})