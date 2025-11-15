import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionTeam',
    title: 'Team Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'link',
        }),
        defineField({
            name: 'members',
            title: 'Team members',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            count: 'members.length',
        },
        prepare({ title, count }) {
            return {
                title,
                subtitle: count ? `${count} members` : 'No members',
            }
        },
    },
})