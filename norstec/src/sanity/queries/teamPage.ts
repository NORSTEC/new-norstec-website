import { defineQuery } from "next-sanity";

export const TEAM_PAGE_QUERY = defineQuery(`
  *[_type == "teamPage"][0]{
    _id,
    sections[]->{
      _id,
      _type,
      ...,
      "members": select(
        _type == "sectionTeam" => members[]{
          _key,
          member->{
            _id,
            _type,
            name,
            photo,
            photoAlt,
            phone,
            email,
            linkedin
          },
          role->{
            _id,
            _type,
            title
          }
        }
      )
    }
  }
`);
