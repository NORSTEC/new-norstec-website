import { defineQuery } from "groq";

export const LANDING_PAGE_QUERY = defineQuery(`
  *[_type == "landingPage"][0]{
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
