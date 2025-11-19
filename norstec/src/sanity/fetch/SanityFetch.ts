import {sanityFetch} from "@/sanity/lib/live";
import {HomePage} from "@/app/types/pages/homePage";
import {InitiativesPage} from "@/app/types/pages/initiativesPage";
import {HOME_PAGE_QUERY} from "@/sanity/queries/pages/homePage";
import {INITIATIVES_PAGE_QUERY} from "@/sanity/queries/pages/initiativesPage";

// ============== PAGES ============== //
export const getHomePage = async (): Promise<HomePage | null> => {
    try {
        const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
        return (data as HomePage) ?? null;
    } catch (e) {
        console.error("Error fetching homepage:", e);
        return null;
    }
};

export const getInitiativesPage = async (): Promise<InitiativesPage | null> => {
    try {
        const { data } = await sanityFetch({ query: INITIATIVES_PAGE_QUERY });
        return (data as InitiativesPage) ?? null;
    } catch (e) {
        console.error("Error fetching initiatives page:", e);
        return null;
    }
};