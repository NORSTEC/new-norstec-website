import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'joinPage',
  title: 'Join page',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'sectionHero'},
            {type: 'sectionTextImage'},
            {type: 'sectionJoin'},
            {type: 'sectionTeam'},
            {type: 'sectionDivider'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'Join page',
      }
    },
  },
})
