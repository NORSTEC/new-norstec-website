import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionHeaderImage',
    title: 'Header + Image Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Main heading shown above the text content.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {hotspot: true},
            description: 'Image placed below the header.',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'link',
            title: 'Link',
            type: 'link',
            description:
                'Optional link shown below the text. Can be an internal or external link.',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            hasBody: 'body',
        },
        prepare({ title, hasBody }) {
            return {
                title: title || 'Header + Text Section',
                subtitle: hasBody ? 'With text' : 'No text added',
            }
        },
    },
})