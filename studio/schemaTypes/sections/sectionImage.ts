import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sectionImage',
  title: 'Image Section',
  type: 'document',

  fields: [
    defineField({
      name: 'images',
      title: 'Carousel of Images',
      type: 'array',
      description: 'Here you can display an array of images.',
      validation: Rule => Rule.min(3).required(),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            },
            {
              name: 'imageAlt',
              title: 'Image alt text',
              type: 'string',
              validation: Rule => Rule.required(),
            }
          ]
        }
      ]
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})