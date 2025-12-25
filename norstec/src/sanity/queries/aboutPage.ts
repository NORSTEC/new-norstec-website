import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    _id,
    sections[]->{
      _id,
      _type,
        ...
    }
  }
`);
