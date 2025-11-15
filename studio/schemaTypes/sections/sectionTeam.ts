import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'sectionTeam',
    title: 'Team Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Main heading for this team section.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body text',
            type: 'portableText',
            description: 'Optional introduction text shown above the team members.',
        }),
        defineField({
            name: 'members',
            title: 'Team members',
            type: 'array',
            description: 'Select the team members that should appear in this section, in order.',
            of: [{type: 'reference', to: [{type: 'teamMember'}]}],
            validation: Rule =>
                Rule.min(1).warning('A team section usually contains at least one member.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            members: 'members',
        },
        prepare({title, members}) {
            const count = members?.length || 0
            return {
                title: title || 'Team Section',
                subtitle: count ? `${count} member${count > 1 ? 's' : ''}` : 'No members selected',
            }
        },
    },
})