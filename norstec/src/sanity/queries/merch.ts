import {defineQuery} from "next-sanity";

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

const PRODUCT_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  description,
  images,
  shopifyProductId,
  shopifyVariantId,
  "price": {
    "amount": price,
    "currencyCode": currencyCode
  },
  featured
`;

export const MERCH_PRODUCTS_QUERY = defineQuery(`
  *[
    _type == "product" &&
    active == true &&
    defined(slug.current) &&
    defined(shopifyVariantId) &&
    defined(price) &&
    defined(currencyCode)
  ]
    | order(featured desc, sortOrder asc, title asc) {
      ${PRODUCT_FIELDS}
    }
`);

export const MERCH_PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "product" &&
    active == true &&
    slug.current == $slug &&
    defined(shopifyVariantId) &&
    defined(price) &&
    defined(currencyCode)
  ][0] {
    ${PRODUCT_FIELDS}
  }
`);
