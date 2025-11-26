import { defineType, defineField } from "sanity";

export default defineType({
  name: "mapPosition",
  title: "Map position",
  type: "object",
  fields: [
    defineField({
      name: "x",
      title: "X (horizontal position)",
      type: "number",
      description: "X coordinate in the Norway map viewBox (0 – 1482).",
      validation: (Rule) => Rule.required().min(0).max(1482),
    }),
    defineField({
      name: "y",
      title: "Y (vertical position)",
      type: "number",
      description: "Y coordinate in the Norway map viewBox (0 – 1763).",
      validation: (Rule) => Rule.required().min(0).max(1763),
    }),
  ],
});