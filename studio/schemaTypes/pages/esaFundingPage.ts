import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'esaFundingPage',
  title: 'ESA funding page',
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
            {type: 'sectionFaq'},
            {type: 'sectionDivider'},
            {type: 'sectionEsaFundingForm'},
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'ESA funding page'}
    },
  },
})
