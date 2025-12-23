import {getHomePage, getInitiativesPage} from "@/sanity/fetch/SanityFetch";
import ClientHomePage from "@/app/ClientHomePage";

export const revalidate = 5; // midlertidig, skal sette opp webhooks.

export default async function HomePage() {
  const homePage = await getHomePage();
  // const initiatives = await getInitiativesPage()
  console.log(homePage)
  if (!homePage) {
    return (<p></p>);
  }

  return <ClientHomePage data={homePage} />;
}
