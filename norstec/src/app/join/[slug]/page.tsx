import { notFound } from "next/navigation";
import { getApplicationBySlug } from "@/sanity/fetch/SanityFetch";
import ClientApplicationPage from "./ClientApplicationPage";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ApplicationSlugPage({ params }: Props) {
    const { slug } = await params;

    const application = await getApplicationBySlug(slug);
    if (!application) {
        notFound();
    }

    return <ClientApplicationPage data={application} />;
}
