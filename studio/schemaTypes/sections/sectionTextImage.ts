import { defineType, defineField } from "sanity";

export default defineType({
  name: "sectionTextImage",
  title: "Text + Image Section",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mirrored",
      title: "Mirror layout?",
      type: "boolean",
      description: "Mirrors the layout",
      initialValue: false,
    }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      description: "1–3 images show images in grid. 4+ uses Image Carousel.",
      validation: (Rule) => Rule.min(1).required(),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "imageAlt",
              title: "Image alt text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),

    defineField({
      name: "threeImageLayout",
      title: "3-image layout",
      type: "string",
      initialValue: "equal",
      options: {
        list: [
          { title: "Equal (1/3 + 1/3 + 1/3)", value: "equal" },
          { title: "Featured (1/2 + 1/4 + 1/4)", value: "featured" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) => (parent?.images?.length ?? 0) !== 3,
    }),

    defineField({
      name: "featuredPosition",
      title: "Featured image position",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Middle", value: "middle" },
          { title: "Right", value: "right" },
        ],
        layout: "radio",
      },
      hidden: ({ parent }) =>
        (parent?.images?.length ?? 0) !== 3 || parent?.threeImageLayout !== "featured",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images.0.image",
    },
    prepare({ title, media }) {
      return { title, media };
    },
  },
});
