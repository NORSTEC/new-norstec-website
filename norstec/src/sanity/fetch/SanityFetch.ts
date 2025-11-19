import {sanityFetch} from "@/sanity/lib/live";
import {HomePage} from "@/app/types/pages/homePage";
import {HOME_PAGE_QUERY} from "@/sanity/queries/pages/homePage";
export const getHomePage = async (): Promise<HomePage | null> => {
    try {
        const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
        return (data as HomePage) ?? null;
    } catch (e) {
        console.error("Error fetching homepage:", e);
        return null;
    }
};