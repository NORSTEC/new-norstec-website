import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    sections[] {
      ...,
      
      // HERO
      _type == "sectionHero" => {
        _id,
        _type,
        heroTitle,
        heroImage
      },

      // TEXT + IMAGE
      _type == "sectionTextImage" => {
        _id,
        _type,
        layout,
        showBreadcrumb,
        title,
        showIcon,
        body,
        image,
        imageAlt,
        link
      },

      // STATS
      _type == "sectionStats" => {
        _id,
        _type,
        title,
        colorToken->{
          _id,
          value,
          name
        },
        items[]->{
          _id,
          value,
          caption,
          icon
        }
      },

      // MAP
      _type == "sectionMap" => {
        _id,
        _type,
        title,
        body
      },

      // TABLE
      _type == "sectionTable" => {
        _id,
        _type,
        title,
        columns,
        rows
      },

      // CTA GRID
      _type == "sectionCtaGrid" => {
        _id,
        _type,
        title,
        items[]->{
          _id,
          title,
          link,
          icon
        }
      },

      // CONTACT
      _type == "sectionContact" => {
        _id,
        _type,
        title,
        body
      },

      // INITIATIVES
      _type == "sectionInitiatives" => {
        _id,
        _type,
        title,
        body,
        initiatives[]->{
          _id,
          title,
          slug,
          heroImage
        }
      },

      // MEDIA
      _type == "sectionMedia" => {
        _id,
        _type,
        title,
        items[]->{
          _id,
          title,
          embedUrl,
          thumbnail
        }
      },

      // PODCAST
      _type == "sectionPodcast" => {
        _id,
        _type,
        title,
        limit,
        showSpotifyLink,
        spotifyUrl
      }
    }
  }
`);
