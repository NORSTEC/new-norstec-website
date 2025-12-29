import { getSponsorPage } from "@/sanity/fetch/SanityFetch";
import ClientSponsorPage from "@/app/sponsors/ClientSponsorPage";


export const revalidate = 5; // midlertidig, skal sette opp webhooks.

export default async function SponsorPage() {
    const sponsorPage = await getSponsorPage();
    console.log("Sponsor page loaded", sponsorPage);

    if (!sponsorPage) {
        return <>loading</>;
    }

    return <ClientSponsorPage sponsorPage={sponsorPage} />;
}
