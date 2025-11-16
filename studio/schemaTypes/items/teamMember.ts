import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'teamMember',
    title: 'Team member',
    type: 'document',
    fields: [
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {hotspot: true},
            description: 'Profile photo of the team member.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'photoAlt',
            title: 'Photo alt text',
            type: 'string',
            description: 'Describe the person and context for screen readers.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Full name of the team member.',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone number',
            type: 'string',
            description: 'Optional phone number.',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            description: 'Optional email address.',
            validation: Rule => Rule.email().warning('Must be a valid email if filled out.'),
        }),
        defineField({
            name: 'linkedin',
            title: 'LinkedIn URL',
            type: 'url',
            description: 'Link to the person’s LinkedIn profile.',
            validation: Rule =>
                Rule.uri({scheme: ['http', 'https']}).warning('Must be a valid URL if filled out.'),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'photo',
        },
        prepare({title, media}) {
            return {
                title: title || 'Unnamed team member',
                media,
            }
        },
    },
})