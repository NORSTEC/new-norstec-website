import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionPodcast',
    title: 'Podcast Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'episodes',
            title: 'Episodes',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'podcastEpisode' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            count: 'episodes.length',
        },
        prepare({ title, count }) {
            return {
                title,
                subtitle: count ? `${count} episodes` : 'No episodes',
            }
        },
    },
})