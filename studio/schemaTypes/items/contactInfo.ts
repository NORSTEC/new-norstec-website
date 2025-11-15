import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactInfo',
    title: 'Contact Info',
    type: 'document',
    fields: [
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            description: 'Primary contact email.',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
            description: 'Primary contact phone number.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'orgNumber',
            title: 'Organisation Number',
            type: 'string',
        }),
        defineField({
            name: 'socials',
            title: 'Social Links',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'A list of social media URLs.',
        }),
    ],

    preview: {
        select: {
            email: 'email',
            phone: 'phone',
        },
        prepare({ email, phone }) {
            return {
                title: email || 'Contact Info',
                subtitle: phone || '',
            }
        },
    },
})