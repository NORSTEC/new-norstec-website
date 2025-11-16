import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'sectionMedia',
    title: 'Media Section',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Heading shown above the media grid on the page.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'items',
            title: 'Media items',
            type: 'array',
            description:
                'Pick the videos you want to show in this section, in the order they should appear.',
            of: [{type: 'reference', to: [{type: 'mediaItem'}]}],
            validation: (Rule) =>
                Rule.min(1).warning('A media section usually contains at least one item.'),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            items: 'items',
        },
        prepare({ title, items }) {
            const count = items?.length || 0

            return {
                title: title || 'Media Section',
                subtitle: count
                    ? `${count} media item${count > 1 ? 's' : ''}`
                    : 'No items',
            }
        },
    },
})