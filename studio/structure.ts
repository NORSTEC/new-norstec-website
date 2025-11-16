import {
    HomeIcon,
    InfoOutlineIcon,
    UsersIcon,
    UserIcon,
    AddUserIcon,
    ArchiveIcon,
    SparklesIcon,
    HelpCircleIcon,
    VideoIcon,
    EnvelopeIcon,
    SparkleIcon,
} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const singletonTypes = [
    'homePage',
    'aboutPage',
    'teamPage',
    'joinPage',
    'initiativesPage',
    'footer',
    'contactInfo',
]

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // -------- PAGES --------
            S.listItem()
                .title('Home page')
                .icon(HomeIcon)
                .child(
                    S.editor()
                        .id('homePage')
                        .schemaType('homePage')
                        .documentId('homePage'),
                ),

            S.listItem()
                .title('About page')
                .icon(InfoOutlineIcon)
                .child(
                    S.editor()
                        .id('aboutPage')
                        .schemaType('aboutPage')
                        .documentId('aboutPage'),
                ),

            S.listItem()
                .title('Team page')
                .icon(UsersIcon)
                .child(
                    S.editor()
                        .id('teamPage')
                        .schemaType('teamPage')
                        .documentId('teamPage'),
                ),

            S.listItem()
                .title('Join page')
                .icon(AddUserIcon)
                .child(
                    S.editor()
                        .id('joinPage')
                        .schemaType('joinPage')
                        .documentId('joinPage'),
                ),

            S.listItem()
                .title('Initiatives page')
                .icon(SparklesIcon)
                .child(
                    S.editor()
                        .id('initiativesPage')
                        .schemaType('initiativesPage')
                        .documentId('initiativesPage'),
                ),

            S.divider(),

            // -------- CONTENT --------
            S.listItem()
                .title('Initiatives')
                .icon(SparkleIcon)
                .child(S.documentTypeList('initiative').title('Initiatives')),

            S.listItem()
                .title('Team members')
                .icon(UserIcon)
                .child(S.documentTypeList('teamMember').title('Team members')),

            S.listItem()
                .title('Media items')
                .icon(VideoIcon)
                .child(S.documentTypeList('mediaItem').title('Media items')),

            S.listItem()
                .title('FAQ items')
                .icon(HelpCircleIcon)
                .child(S.documentTypeList('faqItem').title('FAQ items')),

            S.divider(),

            // -------- Contact Info --------
            S.listItem()
                .title('Contact info')
                .icon(EnvelopeIcon)
                .child(
                    S.editor()
                        .id('contactInfo')
                        .schemaType('contactInfo')
                        .documentId('contactInfo'),
                ),

            S.divider(),

            // -------- ALL DOCUMENTS --------
            S.listItem()
                .title('All documents')
                .icon(ArchiveIcon)
                .child(
                    S.list()
                        .title('All document types')
                        .items(
                            S.documentTypeListItems().filter(
                                (listItem) => !singletonTypes.includes(listItem.getId() || ''),
                            ),
                        ),
                ),
        ])
