import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionJoin',
    title: 'Join Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description:
                'Main heading for this section. Typically a short and motivating title such as “Join us” or “Become a member”.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'body',
            title: 'Body text',
            type: 'portableText',
            description:
                'Supporting text explaining how users can join, participate, or get involved.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            description:
                'Optional links shown below the text. Useful for “Register here”, “Read more”, or similar actions.',
            of: [{ type: 'link' }],
        }),

        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            description:
                '4 images shown to the right of the text.',
            of: [{ type: 'image' }],
            options: { layout: 'grid' },
        }),
    ],

    preview: {
        select: {
            title: 'title',
            images: 'images',
        },
        prepare({ title, images }) {
            return {
                title: title || 'Join Section',
                subtitle: images?.length
                    ? `${images.length} image${images.length > 1 ? 's' : ''}`
                    : 'No images added',
            }
        },
    },
})