import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sectionIncubatorContactForm',
  title: 'Incubator Contact Form Section',
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
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
