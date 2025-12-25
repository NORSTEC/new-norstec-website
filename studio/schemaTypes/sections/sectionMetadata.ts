import { defineType, defineField } from "sanity";

/**
 * Metadata-objekt
 * ---------------
 * Dette objektet er ment å speile Next.js App Router sin `Metadata` API
 * så tett som mulig.
 *
 * Hensikt:
 * - Gjenbrukbart metadata-oppsett for alle sider, med ulik funksjonalitet
 * - All SEO og social sharing styres fra Sanity
 * - Ingen hardkoding av metadata i frontend
 *
 * Viktig for fremtidige utviklere:
 * - Alle felt er valgfrie
 * - Frontend MÅ ha fornuftige fallback-verdier
 *   (f.eks. sidetittel, globale site-defaults)
 */
export const metadata = defineType({
    name: "metadata",
    title: "Metadata (Next.js)",
    type: "object",
    fieldsets: [
        { name: "seo", title: "SEO" },
        { name: "robots", title: "Robots / indeksering" },
        { name: "openGraph", title: "Open Graph (Facebook, LinkedIn m.m.)" },
        { name: "twitter", title: "Twitter / X" },
        { name: "icons", title: "Ikoner" },
        { name: "alternates", title: "Alternative URL-er / språk" },
        { name: "verification", title: "Search engine verification" },
    ],

    fields: [
        /* ==========================================================
           SEO — grunnleggende metadata for søkemotorer
           Mapper direkte til Next.js Metadata API
           ========================================================== */

        defineField({
            name: "title",
            title: "Meta title",
            type: "string",
            fieldset: "seo",
            description:
                "Tittel som vises i browser-tab og søkeresultater (Google, Bing).",
            validation: (Rule) =>
                Rule.max(60).warning(
                    "Anbefalt maks 60 tegn for optimal visning i Google."
                ),
        }),

        defineField({
            name: "description",
            title: "Meta description",
            type: "text",
            rows: 3,
            fieldset: "seo",
            description:
                "Kort beskrivelse som vises i søkeresultater. Påvirker klikkrate (CTR), ikke ranking direkte.",
            validation: (Rule) =>
                Rule.max(160).warning(
                    "Google viser vanligvis ~155–160 tegn."
                ),
        }),

        defineField({
            name: "keywords",
            title: "Keywords (legacy)",
            type: "array",
            of: [{ type: "string" }],
            fieldset: "seo",
            description:
                "Ikke brukt av Google, men kan være nyttig for interne søk eller eldre systemer.",
        }),

        defineField({
            name: "canonical",
            title: "Canonical URL",
            type: "url",
            fieldset: "seo",
            description:
                "Angir den foretrukne URL-en dersom samme innhold finnes flere steder.",
        }),

        /* ==========================================================
           ROBOTS — styrer indeksering og crawling
           Mapper til Metadata.robots
           ========================================================== */

        defineField({
            name: "noIndex",
            title: "No index",
            type: "boolean",
            fieldset: "robots",
            initialValue: false,
            description:
                "Hvis aktivert: siden indekseres ikke av søkemotorer.",
        }),

        defineField({
            name: "noFollow",
            title: "No follow",
            type: "boolean",
            fieldset: "robots",
            initialValue: false,
            description:
                "Hvis aktivert: søkemotorer følger ikke lenker på siden.",
        }),

        defineField({
            name: "googleBot",
            title: "Googlebot overrides",
            type: "object",
            fieldset: "robots",
            description:
                "Avanserte innstillinger spesifikt for Googlebot.",
            fields: [
                {
                    name: "noImageIndex",
                    type: "boolean",
                    title: "No image index",
                    description:
                        "Forhindrer indeksering av bilder på denne siden.",
                },
                {
                    name: "maxSnippet",
                    type: "number",
                    title: "Max snippet",
                    description:
                        "Maks antall tegn Google kan vise i utdrag.",
                },
                {
                    name: "maxImagePreview",
                    type: "string",
                    title: "Max image preview",
                    description:
                        "Styrer størrelsen på bildepreview i søkeresultater.",
                },
                {
                    name: "maxVideoPreview",
                    type: "number",
                    title: "Max video preview",
                    description:
                        "Maks lengde på video-preview i søkeresultater.",
                },
            ],
        }),

        /* ==========================================================
           OPEN GRAPH — brukes av Facebook, LinkedIn, Slack, m.fl.
           Mapper til Metadata.openGraph
           ========================================================== */

        defineField({
            name: "openGraph",
            title: "Open Graph",
            type: "object",
            fieldset: "openGraph",
            description:
                "Metadata brukt når siden deles på sosiale plattformer.",
            fields: [
                {
                    name: "title",
                    type: "string",
                    title: "OG title",
                    description:
                        "Tittel som vises i social preview.",
                },
                {
                    name: "description",
                    type: "text",
                    rows: 2,
                    title: "OG description",
                    description:
                        "Beskrivelse brukt i social preview.",
                },
                {
                    name: "type",
                    type: "string",
                    title: "OG type",
                    description:
                        "Typisk 'website' eller 'article'.",
                },
                {
                    name: "siteName",
                    type: "string",
                    title: "Site name",
                    description:
                        "Navn på nettstedet (f.eks. firmanavn).",
                },
                {
                    name: "url",
                    type: "url",
                    title: "OG URL",
                    description:
                        "Eksplisitt URL for denne siden.",
                },
                {
                    name: "images",
                    title: "OG images",
                    type: "array",
                    of: [{ type: "image", options: { hotspot: true } }],
                    description:
                        "Anbefalt størrelse: 1200×630 px.",
                },
            ],
        }),

        /* ==========================================================
           TWITTER / X — Twitter Cards
           Mapper til Metadata.twitter
           ========================================================== */

        defineField({
            name: "twitter",
            title: "Twitter / X",
            type: "object",
            fieldset: "twitter",
            description:
                "Metadata brukt av Twitter Cards.",
            fields: [
                {
                    name: "card",
                    type: "string",
                    title: "Card type",
                    options: {
                        list: ["summary", "summary_large_image", "player", "app"],
                    },
                },
                {
                    name: "site",
                    type: "string",
                    title: "@site",
                    description:
                        "Twitter-konto for nettstedet.",
                },
                {
                    name: "creator",
                    type: "string",
                    title: "@creator",
                    description:
                        "Twitter-konto for innholdsskaper.",
                },
                {
                    name: "title",
                    type: "string",
                    title: "Twitter title",
                },
                {
                    name: "description",
                    type: "text",
                    rows: 2,
                    title: "Twitter description",
                },
                {
                    name: "images",
                    title: "Twitter images",
                    type: "array",
                    of: [{ type: "image" }],
                },
            ],
        }),

        /* ==========================================================
           ICONS — favicons og app icons
           Mapper til Metadata.icons
           ========================================================== */

        defineField({
            name: "icons",
            title: "Icons",
            type: "object",
            fieldset: "icons",
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: "faviconPng",
                    title: "Favicon (PNG)",
                    type: "image",
                    description:
                        "Primær favicon. PNG, minimum 32×32 px (brukes i browser tabs).",
                    options: {
                        accept: "image/png",
                    },
                },
                {
                    name: "faviconSvg",
                    title: "Favicon (SVG – optional)",
                    type: "file",
                    description:
                        "Valgfri SVG favicon for moderne nettlesere.",
                    options: {
                        accept: ".svg",
                    },
                },
                {
                    name: "appleTouchIcon",
                    title: "Apple touch icon",
                    type: "image",
                    description:
                        "Brukes på iOS når siden lagres på hjemskjerm. Anbefalt 180×180 px.",
                    options: {
                        accept: "image/png",
                    },
                },
            ],
        }),

    /* ==========================================================
       ALTERNATES — språk og alternative URL-er
       Mapper til Metadata.alternates
       ========================================================== */

        defineField({
            name: "alternates",
            title: "Alternates",
            type: "object",
            fieldset: "alternates",
            fields: [
                {
                    name: "canonical",
                    type: "url",
                    title: "Canonical (override)",
                },
                {
                    name: "languages",
                    title: "Languages",
                    type: "array",
                    description:
                        "Brukes for hreflang og flerspråklige sider.",
                    of: [
                        {
                            type: "object",
                            fields: [
                                { name: "locale", type: "string", title: "Locale (f.eks. nb-NO)" },
                                { name: "url", type: "url", title: "URL" },
                            ],
                        },
                    ],
                },
            ],
        }),

        /* ==========================================================
           VERIFICATION — eierskapsverifisering
           Mapper til Metadata.verification
           ========================================================== */

        defineField({
            name: "verification",
            title: "Verification",
            type: "object",
            fieldset: "verification",
            description:
                "Tokens brukt for å verifisere eierskap i søkemotorer.",
            fields: [
                { name: "google", type: "string", title: "Google" },
                { name: "bing", type: "string", title: "Bing" },
                { name: "yandex", type: "string", title: "Yandex" },
                { name: "facebook", type: "string", title: "Facebook" },
            ],
        }),
    ],
});
