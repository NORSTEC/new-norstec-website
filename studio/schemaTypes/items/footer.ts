import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'contactInfo',
            title: 'Contact Info',
            type: 'reference',
            to: [{ type: 'contactInfo' }],
            description: 'Global contact information used in the footer.',
            validation: (Rule) => Rule.required(),
        }),
    ],

    preview: {
        select: {
            email: 'contactInfo.email',
            phone: 'contactInfo.phone',
        },
        prepare({ email, phone }) {
            return {
                title: 'Footer',
                subtitle: email || phone || 'No contact info selected',
            }
        },
    },
})