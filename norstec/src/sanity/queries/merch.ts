import { defineQuery } from "next-sanity";

export const MERCH_PAGE_QUERY = defineQuery(`
  *[_type == "merchPage"][0] {
    _id,
    _type,
    sections[]->{
      _id,
      _type,
      ...
    }
  }
`);
