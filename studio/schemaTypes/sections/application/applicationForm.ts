import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'application',
    title: 'Application',
    type: 'document',

    fields: [

        defineField({
            name: 'title',
            title: 'Norstec Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'teamOrDepartment',
            title: 'Team | Department',
            type: 'string',
            description: 'e.g. NORSTEC SUMMIT program committee member',
        }),


        defineField({
            name: 'landingImage',
            title: 'Landing Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    validation: Rule => Rule.required(),
                }),
            ],
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'object',
            fields: [
                defineField({
                    name: 'name',
                    title: 'Name',
                    type: 'string',
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                }),
            ],
        }),

        defineField({
            name: 'locations',
            title: 'Locations',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. Oslo, Tromsø, Stockholm',
            options: { layout: 'tags' },
        }),

        defineField({
            name: 'positionType',
            title: 'Position Type',
            type: 'string',
            options: {
                list: [
                    { title: '5–10 hours', value: 'normal_verv' },
                    { title: '10–25 hours', value: 'high_intensity' },
                    { title: 'TBD', value: 'tbd' },
                ],
            },
        }),

        defineField({
            name: 'applicationDeadline',
            title: 'Application Deadline',
            type: 'date',
        }),

        defineField({
            name: 'language',
            title: 'Working Language',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),


        defineField({
            name: 'aboutRole',
            title: 'About the Role',
            type: 'portableText',
        }),

        defineField({
            name: 'responsibilities',
            title: 'What You Will Do',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'requiredQualifications',
            title: 'What We Are Looking For',
            type: 'array',
            of: [{ type: 'string' }],
        }),


        defineField({
            name: 'niceToHave',
            title: 'Nice to Have',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'Nice to Have',
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    of: [{ type: 'string' }],
                }),
            ],
        }),

        defineField({
            name: 'howWeWork',
            title: 'How We Work',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'How We Work',
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'content',
                    title: 'Content',
                    type: 'portableText',
                }),
            ],
        }),

        defineField({
            name: 'expectations',
            title: 'What We Expect From You',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                    initialValue: 'What We Expect From You',
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    of: [{ type: 'string' }],
                }),
            ],
        }),

        defineField({
            name: 'benefits',
            title: 'What You Can Expect From Us',
            type: 'array',
            of: [{ type: 'string' }],
        }),


        defineField({
            name: 'contactPersons',
            title: 'Contact Persons',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'teamMember' }],
                },
            ],
        }),

        defineField({
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
    ],


    preview: {
        select: {
            title: 'title',
            subtitle: 'position.name',
            media: 'landingImage',
        },
    },
})
