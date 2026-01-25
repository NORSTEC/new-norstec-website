import { defineQuery } from "next-sanity";

export const JOIN_PAGE_QUERY = defineQuery(`
  *[_type == "joinPage"][0]{
    _id,
    sections[]->{
      _id,
      _type,
      ...,
      "organizations": select(
        _type == "sectionJoin" => *[_type == "organization"] | order(name asc){
          _id,
          name,
          description,
          location,
          type,
          website,
          specialization,
          mapPosition,
        }
      ),
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
