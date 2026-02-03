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
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'teamOrDepartment',
            title: 'Team | Department',
            type: 'string',
            description: 'e.g. NORSTEC SUMMIT program committee member',
        }),

        defineField({
            name: 'company',
            title: 'Company',
            type: 'object',
            fields: [
                { name: 'name', title: 'Name', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'website', title: 'Website', type: 'url' },
            ],
        }),

        defineField({
            name: 'locations',
            title: 'Locations',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. Oslo, Tromsø, Stockholm',
        }),

        defineField({
            name: 'positionType',
            title: 'Position Type',
            type: 'string',
            options: {
                list: [
                    { title: '5–10 hours', value: 'normal_verv' },
                    { title: '10–25 hours', value: 'high_intensity' },
                    { title: 'Contract', value: 'contract' },
                ],
            },
        }),

        defineField({
            name: 'applicationDeadline',
            title: 'Application Deadline',
            type: 'date',
        }),

        defineField({
            name: 'securityRequirements',
            title: 'Security Requirements',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. European citizen, NATO Secret clearance',
        }),

        defineField({
            name: 'aboutRole',
            title: 'About the Role',
            type: 'array',
            of: [{ type: 'portableTextBlock' }],
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
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'howWeWork',
            title: 'How We Work',
            type: 'array',
            of: [{ type: 'portableTextBlock' }],
        }),

        defineField({
            name: 'expectations',
            title: 'What We Expect From You',
            type: 'array',
            of: [
                defineField({
                    name: 'expectation',
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string' },
                        { name: 'description', type: 'string' },
                    ],
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
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'contactPersons',
            title: 'Contact Persons',
            type: 'array',
            of: [
                defineField({
                    name: 'contactPerson',
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'title', title: 'Title', type: 'string' },
                        { name: 'email', title: 'Email', type: 'string' },
                    ],
                }),
            ],
        }),

        defineField({
            name: 'language',
            title: 'Working Language',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],

    preview: {
        select: {
            title: 'title',
            subtitle: 'stilling.name',
        },
    },
})
