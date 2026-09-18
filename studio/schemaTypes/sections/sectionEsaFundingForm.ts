import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sectionEsaFundingForm',
  title: 'ESA funding form section',
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
      hidden: ({document}) => document?.isOpen !== false,
    }),
    defineField({
      name: 'maxAmount',
      title: 'Normal maximum amount (NOK)',
      type: 'number',
      description: 'Applicants are warned if they apply for more than this.',
      initialValue: 5000,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'ESA funding form section',
        subtitle: 'ESA funding application form',
      }
    },
  },
})
