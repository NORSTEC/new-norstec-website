import { defineType, defineField } from 'sanity'

export const mediaItem = defineType({
    name: 'mediaItem',
    title: 'Media Item',
    type: 'document',
    fields: [
        defineField({
            name: 'embedUrl',
            title: 'Embed URL',
            type: 'url',
            description: 'YouTube/Vimeo/Video embed URL.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Short description of the media item.',
        }),
    ],
    preview: {
        select: {
            title: 'caption',
            subtitle: 'embedUrl',
        },
    },
})