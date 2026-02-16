import { defineQuery } from "next-sanity";

export const APPLICATION_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "application" &&
    slug.current == $slug &&
    !(_id in path("drafts.**"))
  ][0]{
    _id,
    _type,
    title,
    slug,
    teamOrDepartment,
    positionType,
    applicationDeadline,
    locations,
    language,
    landingImage{
      asset,
      crop,
      hotspot,
      alt
    },
    position{
      name,
      description
    },
    aboutRole,
    responsibilities,
    requiredQualifications,
    niceToHave{
      title,
      items
    },
    howWeWork{
      title,
      content
    },
    expectations{
      title,
      items
    },
    benefits,
    contactPersons[]->{
      _id,
      name,
      email,
      phone,
      photo,
      photoAlt
    }
  }
`);
