import { Image } from "@/types/image/image";

export interface SummitSponsor {
  _key: string;
  name?: string;
  priority: number;
  alt: string;
  link: string;
  logo: Image;
}

export interface SectionSummitSponsors {
  _type: "sectionSummitSponsors";
  _id: string;
  title?: string;
  sponsors: SummitSponsor[];
}
