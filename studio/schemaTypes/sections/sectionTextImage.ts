import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionTextImage',
    title: 'Text + Image Section',
    type: 'document',
    fields: [
        defineField({
            name: 'header',
            title: 'Header',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
            description: 'Optional icon on the right side of the header',
            options: { hotspot: true },
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'imageAlt',
            title: 'Image alt text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'link',
            description: 'Optional link at the bottom',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
    },
})