import { defineQuery } from "next-sanity";

export const ARTICLE_PAGE_QUERY = defineQuery(`
  *[_type == "articlePage"][0]{
    _id,
    sections[]->{
      _id,
      _type,
      ...,
      articles[]->{
        _id,
        _type,
        title,
        slug,
        excerpt,
        publishedAt
      },
      coverArticle,
      coverArticleAlt,
      coverYoutube,
      coverYoutubeAlt,
      coverInstagram,
      coverInstagramAlt,
      coverLinkedin,
      coverLinkedinAlt
    }
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    excerpt,
    coverImage,
    coverAlt,
    publishedAt,
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
        _type == "sectionMedia" => items[]->{
          _id,
          _type,
          videoUrl,
          caption
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
        }
      )
    }
  }
`);
