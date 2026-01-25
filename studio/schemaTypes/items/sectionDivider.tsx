import { defineType, defineField } from "sanity";
import React from "react";

export const vintageStripes = defineType({
    name: "sectionDivider",
    title: "Vintage Stripes",
    type: "document",

    fields: [
        defineField({
            name: "color",
            title: "Stripe Color",
            type: "string",
            description: "Choose one of the brand colors",
            options: {
                list: [
                    { title: "Egg", value: "#EDE8DA" },
                    { title: "Copper", value: "#E8804C" },
                    { title: "Sun", value: "#F3AD78" },
                    { title: "Beachball", value: "#30C3CD" },
                    { title: "Moody", value: "#0f1118" },
                    { title: "Sky", value: "#1697B7" },
                    { title: "Summit Dark", value: "#3D5B81" },
                    { title: "Summit Accent", value: "#7EA1E6" },
                    { title: "Summit Warm", value: "#EE6B4D" },
                    { title: "Summit Light", value: "#98C0D9" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "lineDensity",
            title: "Line Density",
            type: "number",
            description: "Controls how dense the stripes are (4 = sparse, 16 = dense)",
            initialValue: 8,
            validation: (Rule) =>
                Rule.min(4).max(16).error("Line density must be between 4 and 16"),
        }),
        defineField({
            name: "paddingTop",
            title: "Padding top (px)",
            type: "number",
            description: "Optional extra padding above the stripes on mobile.",
            initialValue: 0,
            validation: (Rule) => Rule.min(0).max(200),
        }),
        defineField({
            name: "paddingBottom",
            title: "Padding bottom (px)",
            type: "number",
            description: "Optional extra padding below the stripes on mobile.",
            initialValue: 0,
            validation: (Rule) => Rule.min(0).max(200),
        }),
    ],

    preview: {
        select: {
            color: "color",
            lineDensity: "lineDensity",
        },
        prepare({ color, lineDensity }) {
            return {
                title: "Vintage Stripes",
                subtitle: `Density: ${lineDensity}`,
                media: (
                    <div
                        style={{
                width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: "1px solid rgba(0,0,0,0.15)",
            }}
            />
        ),
        };
        },
    },
});
