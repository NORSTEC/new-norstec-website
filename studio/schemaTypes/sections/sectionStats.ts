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
      name: "countUp",
      title: "Animate numbers (count up)?",
      type: "boolean",
      description:
        "ON: Compact layout counts up with loader stripes. OFF: Compact layout shows static numbers with simple stripe reveal (allows 3–4 items).",
      initialValue: true,
    }),

    defineField({
      name: "items",
      title: "Items",
      type: "array",
      description: "3–4 items depending on layout.",
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
              name: "captionTitle",
              title: "Caption title",
              type: "string",
              description: "Optional title over caption.",
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
        Rule.required().custom((items, context) => {
          const parent = context?.parent as any;
          const fullStripes = Boolean(parent?.fullStripes);
          const countUp = parent?.countUp !== false;

          if (!Array.isArray(items)) return "Add at least one stat item.";

          const len = items.length;

          if (fullStripes) {
            if (len !== 4) return "Full stripes layout requires exactly 4 items.";
          } else if (countUp) {
            if (len !== 4) return "Compact count-up layout requires exactly 4 items.";
          } else {
            if (len < 3 || len > 4) return "Static compact layout allows 3 or 4 items.";
          }

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
