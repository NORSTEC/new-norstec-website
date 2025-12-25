import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0]{
    _id,
    sections[]->{
      _id,
      _type,
      ...,
      "items": select(
        _type == "sectionBarList" => items[]->{
          _id,
          value,
          caption
        },
        _type == "sectionStats" => items[]{
          _key,
          numberValue,
          textValue,
          prefix,
          suffix,
          captionTitle,
          caption
        },
        items
      )
    }
  }
`);
