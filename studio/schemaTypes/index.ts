// Pages
import homePage from './pages/homePage'
import aboutPage from './pages/aboutPage'
import teamPage from './pages/teamPage'
import initiativesPage from './pages/initiativesPage'

// Globals
import contactInfo from './globals/contactInfo'
import link from './globals/link'
import portableText from "./globals/portableText";

// Sections
import sectionHero from "./sections/sectionHero";
import sectionTextImage from './sections/sectionTextImage'
import sectionTeam from "./sections/sectionTeam";
import sectionMap from './sections/sectionMap'
import sectionTable from './sections/sectionTable'
import sectionInitiatives from './sections/sectionInitiatives'
import sectionMedia from './sections/sectionMedia'
import sectionPodcast from './sections/sectionPodcast'
import sectionNapkin from './sections/sectionNapkin'
import sectionFaq from './sections/sectionFaq'
import sectionImage from './sections/sectionImage'
import sectionStats from './sections/sectionStats'
import sectionBarList from './sections/sectionBarList'


// Items
import teamMember from './items/teamMember'
import initiative from './items/initiative'
import faqItem from './items/faqItem'
import mediaItem from './items/mediaItem'
import teamRole from "./items/teamRole";
import organization from "./items/organization";
import mapPosition from './items/mapPosition'
import barListItem from './items/barListItem'
import {metadata} from "./sections/sectionMetadata";
import statItem from './items/statItem'

export const schemaTypes = [
    // Pages
    homePage,
    aboutPage,
    teamPage,
    initiativesPage,
    metadata,

    // Globals
    contactInfo,
    link,
    portableText,

    // Sections
    sectionHero,
    sectionTextImage,
    sectionTeam,
    sectionBarList,
    sectionStats,
    sectionMap,
    sectionTable,
    sectionInitiatives,
    sectionMedia,
    sectionPodcast,
    sectionNapkin,
    sectionFaq,
    sectionImage,

    // Items
    teamMember,
    initiative,
    barListItem,
    statItem,
    faqItem,
    mediaItem,
    teamRole,
    organization,
    mapPosition
]