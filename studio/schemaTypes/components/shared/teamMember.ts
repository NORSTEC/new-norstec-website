import {defineField, defineType} from "sanity";

export default defineType({
    name: 'teamMember',
    title: 'Team member',
    type: 'document',
    fields: [
        defineField({
            name: 'teamMemberImage',
            title: 'Image',
            type: 'image',
            options: {hotspot: true}
        }),
        defineField({
            name: 'teamMemberName',
            title: 'Name',
            type: 'string'
        }),
        defineField({
            name: 'teamMemberTitle',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'teamMemberSocials',
            title: 'Socials',
            type: 'string'
        })
    ]
})