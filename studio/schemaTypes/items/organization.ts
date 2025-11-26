import { defineType, defineField } from "sanity";
import {MapPositionInput} from '../ui/MapPositionInput'

export default defineType({
  name: "organization",
  title: "Organization",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Incubator", value: "incubator" },
          { title: "Non-incubator", value: "non-incubator" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "specialization",
      title: "Specialization",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Rocketeering", value: "rocketeering" },
          { title: "Satellites", value: "satellites" },
          { title: "Satellites & Rocketeering", value: "satellites-and-rocketeering" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "website",
      title: "Website",
      type: "url",
      description: "Public homepage of the organization (optional).",
    }),

    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "mapPosition",
      title: "Position on map",
      type: "mapPosition",
      description: "Click on the Norway map to set the position.",
      components: {
        input: MapPositionInput,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "name",
      type: "type",
      specialization: "specialization",
    },
    prepare({ title, type, specialization }) {
      const subtitleParts = [];
      if (type) subtitleParts.push(type === "incubator" ? "Incubator" : "Non-incubator");
      if (specialization) subtitleParts.push(String(specialization));
      return {
        title: title || "Untitled organization",
        subtitle: subtitleParts.join(" • "),
      };
    },
  },
});