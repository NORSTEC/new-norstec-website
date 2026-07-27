import { defineQuery } from "next-sanity";

export const ANNOUNCEMENT_QUERY = defineQuery(`
  *[_type == "homePage"][0].announcement{
    enabled,
    text,
    url,
    showIcon,
    icon,
    showArrow,
    startsAt,
    endsAt,
    "isActive": enabled == true &&
      (!defined(startsAt) || dateTime(startsAt) <= dateTime(now())) &&
      (!defined(endsAt) || dateTime(endsAt) >= dateTime(now()))
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    metadata,
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
