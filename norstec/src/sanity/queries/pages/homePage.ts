import { defineQuery } from "next-sanity";

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    title,
    sections[] {
      ...,
      _type == "hero" => {
        _type,
        heroTitle,
        heroImage
      }
    }
  }
`);
