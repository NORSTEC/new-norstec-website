import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'esaFundingPage',
  title: 'ESA funding page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'ESA Funding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guidelines',
      title: 'Guidelines',
      type: 'portableText',
      description: 'Guidelines for ESA course and conference funding, shown above the form.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isOpen',
      title: 'Accepting applications',
      type: 'boolean',
      description: 'Turn off when the funding pot is used up. The form is then hidden.',
      initialValue: true,
    }),
    defineField({
      name: 'closedMessage',
      title: 'Closed message',
      type: 'text',
      rows: 3,
      description: 'Shown instead of the form when applications are closed.',
      initialValue: 'The ESA funding pot has been used up, so we are not accepting new applications.',
      hidden: ({document}) => document?.isOpen !== false,
    }),
    defineField({
      name: 'maxAmount',
      title: 'Normal maximum amount (NOK)',
      type: 'number',
      description: 'Applicants are warned if they apply for more than this.',
      initialValue: 5000,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'ESA funding page'}
    },
  },
})
