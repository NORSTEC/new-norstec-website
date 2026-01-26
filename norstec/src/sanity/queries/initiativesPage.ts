import { defineQuery } from "next-sanity";

export const INITIATIVES_PAGE_QUERY = defineQuery(`
  *[_type == "initiativesPage"][0]{
    _id,
    title,
    sections[]->{
      ...,
      initiatives[]->{
        _id,
        title,
        tag,
        summary,
        cover,
        coverAlt,
        slug
      }
    }
  }
`);

export const INITIATIVE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "initiative" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    tag,
    summary,
    cover,
    coverAlt,
    slug,
    childPages[]->{
      _id,
      title,
      slug
    },
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
        _type == "sectionFaq" => items[]->{
          _id,
          _type,
          question,
          answer
        },
        items
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
        },
        _type == "sectionBusinessContact" => members[]{
          _key,
          "member": @->{
            _id,
            _type,
            name,
            photo,
            photoAlt,
            phone,
            email,
            linkedin
          }
        },
        _type == "sectionInitiativeAdditionalPage" => members[]{
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

export const INITIATIVE_SUBPAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "initiativePage" && slug.current == $pageSlug][0]{
    _id,
    _type,
    title,
    slug,

    // parent initiative
    "initiative": *[
      _type == "initiative" &&
      references(^._id)
    ][0]{
      _id,
      title,
      slug
    },

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
        _type == "sectionFaq" => items[]->{
          _id,
          _type,
          question,
          answer
        },
        items
      ),

      "members": select(
        // Team section (member + role)
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
        },

        // Business contact section (member only)
        _type == "sectionBusinessContact" => members[]{
          _key,
          "member": @->{
            _id,
            _type,
            name,
            photo,
            photoAlt,
            phone,
            email,
            linkedin
          }
        },

        // Initiative additional page (member + role)
        _type == "sectionInitiativeAdditionalPage" => members[]{
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
