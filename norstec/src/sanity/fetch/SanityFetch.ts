import {sanityFetch} from "@/sanity/lib/live";
import {HomePage} from "@/app/types/pages/homePage";
import {InitiativesPage} from "@/app/types/pages/initiativesPage";
import {HOME_PAGE_QUERY} from "@/sanity/queries/homePage";
import {INITIATIVE_BY_SLUG_QUERY, INITIATIVES_PAGE_QUERY} from "@/sanity/queries/initiativesPage";
import {Initiative} from "@/app/types/items/initiative";
import {AboutPage} from "@/app/types/pages/aboutPage";
import {ABOUT_PAGE_QUERY} from "@/sanity/queries/aboutPage";

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

export const getInitiativeBySlug = async (slug: string): Promise<Initiative | null> => {
    try {
        const { data } = await sanityFetch({ query: INITIATIVE_BY_SLUG_QUERY, params: { slug } });
        return (data as Initiative) ?? null;
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
