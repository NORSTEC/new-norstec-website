import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sectionJoin',
  title: 'Join section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body text',
      type: 'portableText',
      description: 'Optional introduction displayed above the form.',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'Join section',
        subtitle: 'Form and team carousel',
      }
    },
  },
})
