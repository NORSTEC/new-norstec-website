import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'portableText',
    title: 'Rich text',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H1', value: 'h1'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'Quote', value: 'blockquote'},
            ],
            lists: [
                {title: 'Bullet', value: 'bullet'},
                {title: 'Numbered', value: 'number'},
            ],
            marks: {
                decorators: [
                    {title: 'Bold', value: 'strong'},
                    {title: 'Italic', value: 'em'},
                    {title: 'Code', value: 'code'},
                ],
                annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        title: 'URL',
                        fields: [
                            defineField({
                                name: 'href',
                                title: 'URL',
                                type: 'url',
                                validation: (Rule) => Rule.required(),
                            }),
                        ],
                    },
                ],
            },
        },
    ],
})