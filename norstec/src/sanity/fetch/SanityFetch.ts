export const getLandingPage = async (): Promise<LandingPage | null> => {
    try {
        const { data } = await sanityFetch({ query: LANDING_PAGE_QUERY });
        return (data as LandingPage) ?? null;
    } catch (e) {
        console.error("Error fetching landingpage:", e);
        return null;
    }
};