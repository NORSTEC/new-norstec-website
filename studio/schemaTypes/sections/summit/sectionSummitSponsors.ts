import { defineField, defineType } from "sanity";

export default defineType({
  name: "sectionSummitSponsors",
  title: "Summit | Sponsors",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      description:
        "Set a priority number per sponsor. 1 is the highest priority.",
      of: [
        defineField({
          name: "sponsor",
          title: "Sponsor",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: "Internal label used in Studio previews.",
            }),
            defineField({
              name: "priority",
              title: "Priority",
              type: "number",
              description:
                "Lower number means higher priority. Size mapping: 1=4x3, 2=4x2, 3=3x2, 4+=2x1.",
              initialValue: 1,
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .min(1),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
              description:
                "Internal path (/tickets) or full URL (https://example.com).",
              validation: (Rule) =>
                Rule.required().custom((value) => {
                  if (!value) return "Link is required.";
                  if (value.startsWith("/") || /^https?:\/\//.test(value)) {
                    return true;
                  }
                  return "Use an internal path starting with / or a full http(s) URL.";
                }),
            }),
          ],
          preview: {
            select: {
              title: "name",
              alt: "alt",
              link: "link",
              priority: "priority",
              media: "logo",
            },
            prepare({ title, alt, link, priority, media }) {
              const priorityLabel =
                typeof priority === "number" ? `Priority ${priority}` : "No priority";
              return {
                title: title || alt || "Sponsor",
                subtitle: `${priorityLabel}${link ? ` | ${link}` : ""}`,
                media,
              }
            }
          }
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      sponsors: "sponsors",
    },
    prepare({ title, sponsors }) {
      const sponsorCount = Array.isArray(sponsors)
        ? sponsors.length
        : 0;

      return {
        title: title || "Summit sponsors",
        subtitle: `${sponsorCount} sponsor${
          sponsorCount === 1 ? "" : "s"
        }`,
      };
    },
  },
});
