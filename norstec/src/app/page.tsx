import { getHomePage } from "@/sanity/fetch/SanityFetch";
import ClientHomePage from "@/app/ClientHomePage";


export default async function HomePage() {
  const homePage = await getHomePage();

  if (!homePage) {
    return (<p></p>);
  }

  return <ClientHomePage data={homePage} />;
}
