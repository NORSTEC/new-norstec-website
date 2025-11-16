import {defineType, defineField} from 'sanity'
import React from 'react'
import {MediaItemPreview} from '../ui/MediaItemPreview'

export default defineType({
    name: 'mediaItem',
    title: 'Media Item',
    type: 'document',
    fields: [
        defineField({
            name: 'videoUrl',
            title: 'YouTube URL',
            type: 'url',
            description: 'Paste any YouTube link, for example "https://www.youtube.com/watch?v=iFlQb57fJaM"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Short description of the video shown under the video',
        }),
    ],
    preview: {
        select: {
            title: 'caption',
            url: 'videoUrl',
        },
        prepare({title, url}) {
            return {
                title: title || 'Media item',
                subtitle: url,
                media: () =>
                    React.createElement(MediaItemPreview, {
                        title,
                        url,
                    }),
            }
        },
    },
})