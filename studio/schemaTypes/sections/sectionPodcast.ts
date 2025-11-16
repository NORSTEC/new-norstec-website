import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'sectionPodcast',
    title: 'Podcast Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Heading shown above the podcast list.',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'limit',
            title: 'Number of episodes to show',
            type: 'number',
            description: 'How many latest episodes to display. Leave empty to show all episodes.',
        }),

        defineField({
            name: 'showSpotifyLink',
            title: 'Show Spotify link',
            type: 'boolean',
            initialValue: true,
            description: 'Toggle if text “(Only available in Norwegian)” and Spotify icon/link should be shown.',
        }),

        defineField({
            name: 'spotifyUrl',
            title: 'Spotify URL',
            type: 'url',
            description: 'Link to the podcast on Spotify.',
            hidden: ({parent}) => !parent?.showSpotifyLink,
            validation: Rule =>
                Rule.custom((value, context) => {
                    const parent = context.parent as any
                    if (parent?.showSpotifyLink && !value) {
                        return 'Spotify URL is required when “Show Spotify link” is enabled.'
                    }
                    return true
                }),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            limit: 'limit',
        },
        prepare({title, limit}) {
            return {
                title: title || 'Podcast Section',
                subtitle: limit ? `Shows latest ${limit} episode(s)` : 'No limit set',
            }
        },
    },
})