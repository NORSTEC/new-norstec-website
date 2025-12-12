import ClientInitiativePage from "./ClientInitiativePage";

export default function InitiativePage({ params }: { params: { slug: string } }) {
    return <ClientInitiativePage slug={params.slug} />;
}