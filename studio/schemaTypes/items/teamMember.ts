import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'teamMember',
    title: 'Team member',
    type: 'document',
    fields: [
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'photoAlt',
            title: 'Photo alt text',
            type: 'string',
            description: 'Describe the image for accessibility.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'portableText',
            description: 'Short introduction or background.',
        }),
        defineField({
            name: 'socials',
            title: 'Socials',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of social links or handles.',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'title',
            media: 'photo',
        },
    },
})