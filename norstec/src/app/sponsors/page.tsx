import { getSponsorPage } from "@/sanity/fetch/SanityFetch";
import ClientSponsorPage from "@/app/sponsors/ClientSponsorPage";


export const dynamic = 'force-dynamic'

export default async function SponsorPage() {
    const sponsorPage = await getSponsorPage();
    console.log("Sponsor page loaded", sponsorPage);

    if (!sponsorPage) {
        return <>loading</>;
    }

    return <ClientSponsorPage sponsorPage={sponsorPage} />;
}
