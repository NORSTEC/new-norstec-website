import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionHeaderText',
    title: 'Header + Text Section',
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
            name: 'body',
            title: 'Body text',
            type: 'portableText',
            description: 'Optional descriptive text placed below the heading.',
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