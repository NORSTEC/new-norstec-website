import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionPodcast',
    title: 'Podcast Section',
    type: 'document',

    fields: [
        defineField({
            name: 'limit',
            title: 'Number of latest episodes',
            type: 'number',
            description: 'How many of the latest episodes should be visible in the section.',
            validation: (Rule) => Rule.min(1).max(30).integer(),
            initialValue: 4,
        }),
    ],

    preview: {
        select: {
            limit: 'limit',
        },
        prepare({ limit }) {
            return {
                title: 'Podcast Section',
                subtitle: limit ? `Shows latest ${limit} episode(s)` : 'Shows latest episodes',
            }
        },
    },
})
