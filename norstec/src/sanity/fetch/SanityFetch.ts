import {sanityFetch} from "@/sanity/lib/live";


import {LANDING_PAGE_QUERY} from "@/sanity/queries/pages/landingPage";


import {LandingPage} from "@/app/types/pages/landingPage";

export const getLandingPage = async (): Promise<LandingPage | null> => {
    try {
        const { data } = await sanityFetch({ query: LANDING_PAGE_QUERY });
        return (data as LandingPage) ?? null;
    } catch (e) {
        console.error("Error fetching landingpage:", e);
        return null;
    }
};