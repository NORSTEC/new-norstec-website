import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Merch product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'shopifyProductId',
      title: 'Shopify product ID',
      type: 'string',
      description: 'Global ID, for example gid://shopify/Product/123456789.',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          value?.startsWith('gid://shopify/Product/') ? true : 'Must be a Shopify product GID',
        ),
    }),
    defineField({
      name: 'shopifyVariantId',
      title: 'Shopify variant ID',
      type: 'string',
      description: 'Numeric ID or global ID, for example gid://shopify/ProductVariant/123456789.',
      validation: (Rule) =>
        Rule.required().custom((value) =>
          value && (/^\d+$/.test(value) || /^gid:\/\/shopify\/ProductVariant\/\d+$/.test(value))
            ? true
            : 'Must be a numeric Shopify variant ID or ProductVariant GID',
        ),
    }),
    defineField({
      name: 'price',
      title: 'Displayed price',
      type: 'number',
      description: 'Price displayed on the website. Shopify checkout is the final source of truth.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currencyCode',
      title: 'Currency code',
      type: 'string',
      description: 'ISO currency code, for example NOK.',
      initialValue: 'NOK',
      validation: (Rule) =>
        Rule.required()
          .length(3)
          .custom((value) => (value === value?.toUpperCase() ? true : 'Use an uppercase ISO code')),
    }),
    defineField({
      name: 'active',
      title: 'Visible in store',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shopifyVariantId',
      media: 'images.0',
    },
  },
})
