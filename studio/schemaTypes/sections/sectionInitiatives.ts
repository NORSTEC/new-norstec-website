import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'sectionInitiatives',
    title: 'Initiatives Section',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
        }),
        defineField({
            name: 'initiatives',
            title: 'Initiatives',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'initiative' }] }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            initiatives: 'initiatives',
        },
        prepare({ title, initiatives }) {
            const count = initiatives?.length || 0

            return {
                title: title || 'Initiatives Section',
                subtitle:
                    count === 0
                        ? 'No initiatives'
                        : count === 1
                            ? '1 initiative'
                            : `${count} initiatives`,
            }
        },
    },
})