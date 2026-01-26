import { notFound } from "next/navigation";
import { getInitiativeSubPageBySlug } from "@/sanity/fetch/SanityFetch";
import ClientInitiativeSubPage from "./ClientInitiativeSubPage";

export default async function SummitSubPage({
                                                params,
                                            }: {
    params: Promise<{ pageSlug: string }>;
}) {
    const { pageSlug } = await params;

    const page = await getInitiativeSubPageBySlug(
        decodeURIComponent(pageSlug).trim()
    );
    console.log(page)

    if (!page) {
        notFound();
    }

    if (page.initiative?.slug?.current !== "summit") {
        notFound();
    }

    return <ClientInitiativeSubPage page={page} />;
}
