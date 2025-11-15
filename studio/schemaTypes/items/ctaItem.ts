import { defineType, defineField } from 'sanity'

export const ctaItem = defineType({
    name: 'ctaItem',
    title: 'CTA Item',
    type: 'document',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'text',
            title: 'Text',
            type: 'portableText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'linkLabel',
            title: 'Link Label',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'linkUrl',
            title: 'Link URL',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            subtitle: 'linkLabel',
        },
    },
})