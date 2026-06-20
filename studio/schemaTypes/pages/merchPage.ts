import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'merchPage',
  title: 'Merch page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'sectionHero'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Merch page'}
    },
  },
})
