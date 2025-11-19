import { defineQuery } from "next-sanity";

export const INITIATIVES_PAGE_QUERY = defineQuery(`
  *[_type == "initiativesPage"][0]{
    _id,
    sections[]->{
      ...
    }
  }
`);