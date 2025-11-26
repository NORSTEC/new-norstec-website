import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    sections[]->{
      _id,
      _type,
      ...,
      initiatives[]->{
        _id,
        title,
        tag,
        summary,
        cover,
        coverAlt,
        slug
      },
      organizations[]->{
        _id,
        name,
        description,
        location,
        type,
        website,
        specialization,
        mapPosition,
      }
    }
  }
`);