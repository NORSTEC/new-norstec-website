import {defineField, defineType} from "sanity";

export default defineType({
    name: "sectionSummitHost",
    title: "Summit | Host",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "hosts",
            title: "Hosts",
            type: "array",
            of: [
        {
            type: "object",
            fields: [
                        {name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required()},
                        {name: "title", title: "Title", type: "string"},
                        {
                            name: "image",
                            title: "Image",
                            type: "image",
                            options: {hotspot: true},
                        },
                        {
                            name: "imageAlt",
                            title: "Alt text",
                            type: "string",
                            hidden: ({parent}) => !parent?.image,
                        },
                        {
                            name: "bio",
                            title: "Bio",
                            type: "text",
                            rows: 6,
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.min(1).required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            hosts: "hosts",
        },
        prepare({title, hosts}) {
            const count = Array.isArray(hosts) ? hosts.length : 0;
            return {
                title: title || "Host",
                subtitle: count ? `${count} person${count === 1 ? "" : "s"}` : "None added",
            };
        },
    },
});
