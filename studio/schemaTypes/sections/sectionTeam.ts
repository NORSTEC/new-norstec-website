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
            name: 'showStripesCornerTopRight',
            title: 'Show top-right corner stripes',
            type: 'boolean',
            initialValue: true,
            description: 'Display the animated corner stripes in the top-right.',
        }),

        defineField({
            name: 'showStripesCornerBottomRight',
            title: 'Show bottom-right corner stripes',
            type: 'boolean',
            initialValue: true,
            description: 'Display the animated corner stripes in the bottom-right.',
        }),

        defineField({
            name: 'mobileGrid',
            title: 'Use grid on mobile (disable carousel)',
            type: 'boolean',
            initialValue: false,
            description:
                'If enabled, the mobile layout uses the grid instead of the carousel. Leave off to always use the carousel on mobile.',
        }),

        defineField({
            name: 'members',
            title: 'Team members',
            type: 'array',
            description:
                'Choose which people to show in this section and which role they have here.',
            of: [
                defineField({
                    name: 'memberInSection',
                    title: 'Member in section',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'member',
                            title: 'Person',
                            type: 'reference',
                            to: [{type: 'teamMember'}],
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: 'role',
                            title: 'Role in this section',
                            type: 'reference',
                            to: [{type: 'teamRole'}],
                            description: 'The role of the member in this team.',
                            validation: Rule => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {
                            name: 'member.name',
                            role: 'role.title',
                            media: 'member.photo',
                        },
                        prepare({name, role, media}) {
                            return {
                                title: name || 'Unnamed member',
                                subtitle: role || 'No role selected',
                                media,
                            }
                        },
                    },
                }),
            ],
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
