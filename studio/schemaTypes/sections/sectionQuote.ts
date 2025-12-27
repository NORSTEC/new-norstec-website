import { defineField, defineType } from "sanity";

export default defineType({
  name: "sectionQuote",
  title: "Quote Section",
  type: "document",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableText",
      description: "Optional supporting text under the header.",
    }),
  ],
  preview: {
    select: {
      title: "header",
    },
    prepare({ title }) {
      return {
        title: title || "Quote Section",
      };
    },
  },
});
