// Pages
import homePage from './pages/homePage'
import aboutPage from './pages/aboutPage'
import teamPage from './pages/teamPage'
import initiativesPage from './pages/initiativesPage'
import {sponsorPage} from "./pages/sponsorPage";
import joinPage from './pages/joinPage'
import articlePage from "./pages/articlePage";

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
import sectionArticles from "./sections/sectionArticles";
import sectionNapkin from './sections/sectionNapkin'
import sectionFaq from './sections/sectionFaq'
import sectionImage from './sections/sectionImage'
import sectionStats from './sections/sectionStats'
import sectionBarList from './sections/sectionBarList'
import sectionQuote from "./sections/sectionQuote";
import {sectionSponsor} from "./sections/sectionSponsor";
import sectionSummitTextImage from "./sections/summit/sectionSummitTextImage";
import sectionSummitTimer from "./sections/summit/sectionSummitTimer";
import sectionSummitHost from "./sections/summit/sectionSummitHost";
import sectionSummitInfo from "./sections/summit/sectionSummitInfo";
import sectionSummitProgram from "./sections/summit/sectionSummitProgram";
import sectionSummitSponsors from "./sections/summit/sectionSummitSponsors";
import sectionJoin from "./sections/sectionJoin";
import sectionIncubatorContactForm from "./sections/sectionIncubatorContactForm";
import sectionInitiativeAdditionalPage from "./sections/summit/newPage/sectionInitiativeAdditionalPage";
import sectionApplication from "./sections/summit/sectionApplication";
// Items
import teamMember from './items/teamMember'
import initiative from './items/initiative'
import article from "./items/article";
import faqItem from './items/faqItem'
import mediaItem from './items/mediaItem'
import teamRole from "./items/teamRole";
import organization from "./items/organization";
import mapPosition from './items/mapPosition'
import barListItem from './items/barListItem'
import {metadata} from "./sections/sectionMetadata";
import statItem from './items/statItem'
import {vintageStripes} from "./items/sectionDivider";
import sectionBusinessContact from "./sections/summit/sectionBusinessContact";
import application from "./sections/application/applicationForm"
import {sectionSummitBillboard} from "./sections/summit/sectionSummitBillboard";
import summitProgramPage from "./sections/summit/newPage/SummitProgramPage";




export const schemaTypes = [
    // Pages
    homePage,
    aboutPage,
    teamPage,
    initiativesPage,
    metadata,
    sponsorPage,
    joinPage,
    articlePage,
    summitProgramPage,

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
    sectionArticles,
    sectionPodcast,
    sectionNapkin,
    sectionFaq,
    sectionImage,
    sectionQuote,
    sectionJoin,
    sectionIncubatorContactForm,
    sectionSponsor,
    sectionSummitTextImage,
    sectionSummitTimer,
    sectionSummitHost,
    sectionSummitInfo,
    sectionSummitProgram,
    sectionSummitSponsors,
    sectionBusinessContact,
    sectionInitiativeAdditionalPage,
    sectionApplication,
    sectionSummitBillboard,

    // Application
    application,

    // Items
    teamMember,
    initiative,
    article,
    barListItem,
    statItem,
    faqItem,
    mediaItem,
    teamRole,
    organization,
    mapPosition,
    vintageStripes,
]
