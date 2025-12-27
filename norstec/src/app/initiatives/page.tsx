import ClientInitiativesPage from "@/app/initiatives/ClientInitiativesPage";
import { getInitiativesPage } from "@/sanity/fetch/SanityFetch";

export const revalidate = 5;

export default async function InitiativesPage() {
    const initiativesPage = await getInitiativesPage();

    if (!initiativesPage) {
        return <p></p>;
    }

    return <ClientInitiativesPage data={initiativesPage} />;
}
