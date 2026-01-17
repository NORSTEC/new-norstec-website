import { getAboutPage } from "@/sanity/fetch/SanityFetch";
import ClientAboutPage from "@/app/about/ClientAboutPage";
export const dynamic = 'force-dynamic'
export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    return <p>loading</p>;
  }

  return <ClientAboutPage data={aboutPage} />;
}
