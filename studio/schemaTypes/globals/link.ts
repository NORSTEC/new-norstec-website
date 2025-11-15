import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'enabled',
            title: 'Show link',
            type: 'boolean',
            initialValue: false,
            description: 'Turn on if this section should have a link/button.',
        }),

        defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'Text shown on the button/link.',
            hidden: ({parent}) => !parent?.enabled,
        }),

        defineField({
            name: 'linkType',
            title: 'Link type',
            type: 'string',
            options: {
                list: [
                    {title: 'Internal link', value: 'internal'},
                    {title: 'External link', value: 'external'},
                ],
                layout: 'radio',
            },
            initialValue: 'internal',
            hidden: ({parent}) => !parent?.enabled,
        }),

        defineField({
            name: 'internalDocument',
            title: 'Internal document',
            type: 'reference',
            to: [
                {type: 'homePage'},
                {type: 'aboutPage'},
                {type: 'teamPage'},
                {type: 'joinPage'},
                {type: 'initiativesPage'},
                {type: 'initiative'},
            ],
            description: 'Select which page this link should go to.',
            hidden: ({parent}) => !parent?.enabled || parent?.linkType !== 'internal',
        }),

        defineField({
            name: 'externalUrl',
            title: 'External URL',
            type: 'url',
            description: 'Full URL including https://',
            hidden: ({parent}) => !parent?.enabled || parent?.linkType !== 'external',
        }),
    ],

    validation: (Rule) =>
        Rule.custom((value) => {
            if (!value || !value.enabled) return true

            const {label, linkType, internalDocument, externalUrl} = value

            if (!label) {
                return 'Label is required when the link is enabled.'
            }

            if (linkType === 'internal' && !internalDocument) {
                return 'Select an internal page for this link.'
            }

            if (linkType === 'external' && !externalUrl) {
                return 'Add an external URL for this link.'
            }

            return true
        }),
})