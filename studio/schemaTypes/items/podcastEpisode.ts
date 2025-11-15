import { defineType, defineField } from 'sanity'

export const podcastEpisode = defineType({
    name: 'podcastEpisode',
    title: 'Podcast Episode',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'embedUrl',
            title: 'Embed URL',
            type: 'url',
            description: 'Spotify embed URL.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'portableText',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'published',
            title: 'Published (text)',
            type: 'string',
            description: 'Example: "Nov 12, 2025".',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'season',
            title: 'Season',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'episode',
            title: 'Episode',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'cover',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverAlt',
            title: 'Cover Image Alt Text',
            type: 'string',
            description: 'Describe the image for accessibility.',
            validation: (Rule) => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'published',
            media: 'cover',
        },
    },
})