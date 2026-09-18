import { defineQuery } from "next-sanity";

export const ESA_FUNDING_PAGE_QUERY = defineQuery(`
  *[_type == "esaFundingPage"][0]{
    _id,
    sections[]->{
      _id,
      _type,
      ...,
      "items": select(
        _type == "sectionFaq" => items[]->{
          _id,
          _type,
          question,
          answer
        },
        items
      )
    }
  }
`);
