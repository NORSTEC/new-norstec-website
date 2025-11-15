import {defineType, defineField} from 'sanity'
import {MaterialIconInput} from "../globals/materialIconInput";

export default defineType({
    name: 'ctaItem',
    title: 'CTA Item',
    type: 'document',

    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Icon displayed above the title.',
            components: { input: MaterialIconInput },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'Heading shown for the CTA.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'body',
            title: 'Body',
            type: 'portableText',
            description: 'Short descriptive text under the title.',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'link',
            title: 'Link',
            type: 'link',
            description:
                'Link for this CTA. Can point to an internal page or an external URL.',
            validation: (Rule) => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            linkLabel: 'link.label',
        },
        prepare({title, linkLabel}) {
            return {
                title: title || 'CTA Item',
                subtitle: linkLabel || 'No link label set',
            }
        },
    },
})