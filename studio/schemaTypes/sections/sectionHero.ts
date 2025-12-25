import { defineField, defineType } from "sanity";

export default defineType({
  name: "sectionHero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Hero Title",
      type: "string",
      description: "Optional main title on top of image",
    }),
    defineField({
      name: "subtitle",
      title: "Hero Subtitle",
      type: "string",
      description: "Optional subtitle displayed under the title",
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Hero Section",
        subtitle,
        media,
      };
    },
  },
});
