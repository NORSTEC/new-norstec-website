import { sanityFetch } from "@/sanity/lib/live";
import { HomePage } from "@/types/pages/homePage";
import { InitiativesPage } from "@/types/pages/initiativesPage";
import { HOME_PAGE_QUERY } from "@/sanity/queries/homePage";
import { INITIATIVE_BY_SLUG_QUERY, INITIATIVES_PAGE_QUERY } from "@/sanity/queries/initiativesPage";
import { InitiativePage } from "@/types/pages/initiativePage";
import { AboutPage } from "@/types/pages/aboutPage";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries/aboutPage";
import {SponsorPage} from "@/types/sections/sectionSponsor";
import {SPONSOR_PAGE_QUERY} from "@/sanity/queries/sponsorPage";

// ============== HOME ============== //
export const getHomePage = async (): Promise<HomePage | null> => {
  try {
    const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
    return (data as HomePage) ?? null;
  } catch (e) {
    console.error("Error fetching homepage:", e);
    return null;
  }
};

// ============== INITIATIVE ============== //
export const getInitiativesPage = async (): Promise<InitiativesPage | null> => {
  try {
    const { data } = await sanityFetch({ query: INITIATIVES_PAGE_QUERY });
    return (data as InitiativesPage) ?? null;
  } catch (e) {
    console.error("Error fetching initiatives page:", e);
    return null;
  }
};

export const getInitiativeBySlug = async (slug: string): Promise<InitiativePage | null> => {
  if (!slug) {
    return null;
  }

  try {
    const { data } = await sanityFetch({ query: INITIATIVE_BY_SLUG_QUERY, params: { slug } });
    return (data as InitiativePage) ?? null;
  } catch (e) {
    console.error("Error fetching initiative:", e);
    return null;
  }
};
// ============== ABOUT ============== //
export const getAboutPage = async (): Promise<AboutPage | null> => {
  try {
    const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
    return (data as AboutPage) ?? null;
  } catch (e) {
    console.error("Error fetching about page:", e);
    return null;
  }
};

// ============== SPONSOR ============== //
export const getSponsorPage = async (): Promise<SponsorPage | null> => {
  try {
    const { data } = await sanityFetch({ query: SPONSOR_PAGE_QUERY });
    return (data as SponsorPage) ?? null;
  } catch (e) {
    console.error("Error fetching sponsor page:", e);
    return null;
  }
};


