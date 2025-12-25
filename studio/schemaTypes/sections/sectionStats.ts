import { defineType, defineField } from "sanity";

const PREFIX_SUFFIX_OPTIONS = [
  { title: "None", value: "none" },
  { title: "$", value: "$" },
  { title: "€", value: "€" },
  { title: "+", value: "+" },
  { title: "%", value: "%" },
  { title: "T", value: "T" },
  { title: "B", value: "B" },
] as const;

export default defineType({
  name: "sectionStats",
  title: "Stats Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional heading shown above the section.",
    }),

    defineField({
      name: "fullStripes",
      title: "Use full-page stripes layout?",
      type: "boolean",
      description:
        "ON: Full-page stripes layout (value can be text or number). OFF: Compact stats layout (value must be number).",
      initialValue: false,
    }),

    defineField({
      name: "items",
      title: "Items",
      type: "array",
      description: "Exactly 4 items.",
      of: [
        defineField({
          name: "item",
          title: "Stat item",
          type: "object",
          fields: [
            // Tall (brukes alltid i compact)
            defineField({
              name: "numberValue",
              title: "Number",
              type: "number",
            }),

            // Tekst (kun relevant når fullStripes = true)
            defineField({
              name: "textValue",
              title: "Text value",
              type: "string",
              description: 'Example: "Passion", "Community".',
            }),

            // Prefix/suffix rundt tall (compact trenger dette)
            defineField({
              name: "prefix",
              title: "Prefix",
              type: "string",
              options: { list: PREFIX_SUFFIX_OPTIONS.map((o) => ({ title: o.title, value: o.value })) },
              initialValue: "none",
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              options: { list: PREFIX_SUFFIX_OPTIONS.map((o) => ({ title: o.title, value: o.value })) },
              initialValue: "none",
            }),

            defineField({
              name: "caption",
              title: "Caption",
              type: "portableText",
              description: "Short explanation.",
            }),
          ],

          preview: {
            select: {
              n: "numberValue",
              t: "textValue",
              p: "prefix",
              s: "suffix",
            },
            prepare({ n, t, p, s }) {
              const prefix = p && p !== "none" ? p : "";
              const suffix = s && s !== "none" ? s : "";
              const val =
                typeof n === "number"
                  ? `${prefix}${n}${suffix}`
                  : (t ? t : "Item");
              return { title: val };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .length(4)
          .warning("A section has to contain four items.")
          .custom((items, context) => {
            const fullStripes = Boolean((context?.parent as any)?.fullStripes);

            if (!Array.isArray(items)) return true;

            // Compact: numberValue må finnes, textValue skal ikke brukes
            if (!fullStripes) {
              for (const it of items as any[]) {
                if (typeof it?.numberValue !== "number") {
                  return "Compact layout requires Number on every item.";
                }
                if (it?.textValue && String(it.textValue).trim() !== "") {
                  return "Compact layout does not allow Text value. Use Number + prefix/suffix instead.";
                }
              }
            }

            // Full stripes: må ha enten textValue eller numberValue
            if (fullStripes) {
              for (const it of items as any[]) {
                const hasNumber = typeof it?.numberValue === "number";
                const hasText = it?.textValue && String(it.textValue).trim() !== "";
                if (!hasNumber && !hasText) {
                  return "Full stripes layout requires either a Number or a Text value on each item.";
                }
              }
            }

            return true;
          }),
    }),
  ],

  preview: {
    select: {
      title: "title",
      fullStripes: "fullStripes",
      items: "items",
    },
    prepare({ title, fullStripes, items }) {
      const displayTitle = title?.trim() ? title : "Stat Section";
      const count = items?.length || 0;
      return {
        title: displayTitle,
        subtitle: `${count} item(s) • ${fullStripes ? "Full stripes" : "Compact"}`,
      };
    },
  },
});
