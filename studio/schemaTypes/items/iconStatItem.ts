import { defineType, defineField } from 'sanity'
import {MaterialIconInput} from "../ui/MaterialIconInput";

export default defineType({
    name: 'iconStatItem',
    title: 'Icon Stat Item',
    type: 'document',
    fields: [
        defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            components: {
                input: MaterialIconInput,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'Example: "11", "5", "20+", "1M+".',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'Short label or description under the value.',
        }),
    ],
    preview: {
        select: {
            title: 'caption',
            subtitle: 'value',
        },
    },
})