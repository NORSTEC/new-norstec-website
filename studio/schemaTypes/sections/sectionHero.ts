import {defineField, defineType} from "sanity";

export default defineType({
    name: 'sectionHero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'Optional text on top of image',
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {hotspot: true},
            validation: (Rule) => Rule.required(),
        })
    ],
    preview: {
        select: {
            title: 'heroTitle',
            media: 'heroImage',
        },
        prepare({ title, media }) {
            return {
                title: title || 'Hero Section',
                media,
            }
        },
    }
})