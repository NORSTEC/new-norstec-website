import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'homePage',
    title: 'Home page',
    type: 'document',
    fields: [
        defineField({
            name: "metadata",
            title: "Metadata",
            type: "metadata",
            description:
                "SEO, Open Graph, Twitter, robots osv. Gjelder hele siden. Trenger som regel ikke å bli endret på.",
            options: {
                collapsible: true,
                collapsed: true,
            },
        }),
        defineField({
            name: 'announcement',
            title: 'Announcement banner',
            type: 'object',
            description: 'Optional time-sensitive banner shown above the site navigation.',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                defineField({
                    name: 'enabled',
                    title: 'Show announcement',
                    type: 'boolean',
                    initialValue: false,
                }),
                defineField({
                    name: 'text',
                    title: 'Message',
                    type: 'string',
                    description: 'Keep this short enough to read at a glance.',
                    validation: (rule) =>
                        rule.custom((value, context) => {
                            if ((context.parent as {enabled?: boolean})?.enabled && !value) {
                                return 'A message is required when the announcement is enabled'
                            }
                            return true
                        }).max(140),
                    hidden: ({parent}) => !parent?.enabled,
                }),
                defineField({
                    name: 'url',
                    title: 'Link',
                    type: 'url',
                    validation: (rule) =>
                        rule.custom((value, context) => {
                            if ((context.parent as {enabled?: boolean})?.enabled && !value) {
                                return 'A link is required when the announcement is enabled'
                            }
                            return true
                        }).uri({
                            scheme: ['http', 'https'],
                        }),
                    hidden: ({parent}) => !parent?.enabled,
                }),
                defineField({
                    name: 'showIcon',
                    title: 'Show icon',
                    type: 'boolean',
                    initialValue: true,
                    hidden: ({parent}) => !parent?.enabled,
                }),
                defineField({
                    name: 'icon',
                    title: 'Icon',
                    type: 'string',
                    initialValue: 'rocket_launch',
                    options: {
                        list: [
                            {title: 'Rocket launch', value: 'rocket_launch'},
                            {title: 'Satellite', value: 'satellite_alt'},
                            {title: 'Live', value: 'sensors'},
                            {title: 'Announcement', value: 'campaign'},
                        ],
                        layout: 'radio',
                    },
                    hidden: ({parent}) => !parent?.enabled || parent?.showIcon === false,
                }),
                defineField({
                    name: 'showArrow',
                    title: 'Show arrow',
                    type: 'boolean',
                    initialValue: true,
                    hidden: ({parent}) => !parent?.enabled,
                }),
                defineField({
                    name: 'startsAt',
                    title: 'Show from',
                    type: 'datetime',
                    description: 'Optional. Leave empty to show immediately.',
                    hidden: ({parent}) => !parent?.enabled,
                }),
                defineField({
                    name: 'endsAt',
                    title: 'Hide after',
                    type: 'datetime',
                    description: 'Recommended for launch-day announcements.',
                    validation: (rule) =>
                        rule.custom((endsAt, context) => {
                            const startsAt = (context.parent as {startsAt?: string})?.startsAt
                            if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) {
                                return 'Hide after must be later than Show from'
                            }
                            return true
                        }),
                    hidden: ({parent}) => !parent?.enabled,
                }),
            ],
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {type: 'sectionHero'},
                        {type: 'sectionTextImage'},
                        {type: 'sectionMap'},
                        {type: 'sectionTable'},
                        {type: 'sectionInitiatives'},
                        {type: 'sectionMedia'},
                        {type: 'sectionPodcast'},
                        {type: 'sectionImage'},
                        {type: 'sectionDivider'}
                    ],
                },
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Home page',
            }
        },
    },
})
