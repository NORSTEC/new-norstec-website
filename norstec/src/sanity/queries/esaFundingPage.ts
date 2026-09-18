import { defineQuery } from "next-sanity";

export const ESA_FUNDING_PAGE_QUERY = defineQuery(`
  *[_type == "esaFundingPage"][0] {
    _id,
    _type,
    title,
    guidelines,
    isOpen,
    closedMessage,
    maxAmount
  }
`);
