import {defineType, defineField} from 'sanity'

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
            description: 'Example: “ORG NO 123 456 789”.',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Social link',
                    fields: [
                        defineField({
                            name: 'platform',
                            title: 'Platform',
                            type: 'string',
                            options: {
                                list: [
                                    {title: 'Facebook', value: 'facebook'},
                                    {title: 'Instagram', value: 'instagram'},
                                    {title: 'YouTube', value: 'youtube'},
                                    {title: 'Twitter/X', value: 'twitter'},
                                    {title: 'LinkedIn', value: 'linkedin'},
                                    {title: 'TikTok', value: 'tiktok'},
                                ],
                                layout: 'dropdown',
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                            description: 'Full URL including https://',
                            validation: (Rule) =>
                                Rule.required().uri({scheme: ['http', 'https']}),
                        }),
                    ],
                },
            ],
        }),
    ],
    preview: {
        select: {
            email: 'email',
            phone: 'phone',
        },
        prepare({email, phone}) {
            return {
                title: email || 'Contact Info',
                subtitle: phone || '',
            }
        },
    },
})