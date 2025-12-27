import { getAboutPage } from "@/sanity/fetch/SanityFetch";
import ClientAboutPage from "@/app/about/ClientAboutPage";
export const revalidate = 5; // midlertidig, skal sette opp webhooks.
export default async function AboutPage() {
    const aboutPage = await getAboutPage();

    if (!aboutPage) {
        return <p>loading</p>;
    }

    return <ClientAboutPage data={aboutPage}/>;
}



