import { defineQuery } from "next-sanity";

export const INITIATIVES_PAGE_QUERY = defineQuery(`
  *[_type == "initiativesPage"][0]{
    _id,
    title,
    sections[]->{
      _id,
      _type,
      title,
      body,
      initiatives[]->{
        _id,
        title,
        tag,
        summary,
        cover,
        coverAlt,
        slug
      }
    }
  }
`);

export const INITIATIVE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "initiative" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    tag,
    summary,
    cover,
    coverAlt,
    slug,
    sections[]->{
      ...
    }
  }
`);