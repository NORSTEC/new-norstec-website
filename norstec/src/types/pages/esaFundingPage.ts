import type { PortableTextBlock } from "next-sanity";

export interface EsaFundingPage {
  _type: "esaFundingPage";
  _id: string;
  title?: string;
  guidelines?: PortableTextBlock[];
  isOpen?: boolean;
  closedMessage?: string;
  maxAmount?: number;
}
