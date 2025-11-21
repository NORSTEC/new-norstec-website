import {getHomePage, getInitiativesPage} from "@/sanity/fetch/SanityFetch";
import ClientHomePage from "@/app/ClientHomePage";


export default async function HomePage() {
  const homePage = await getHomePage();
  // const initiatives = await getInitiativesPage()
  console.log(homePage)
  if (!homePage) {
    return (<p></p>);
  }

  return <ClientHomePage data={homePage} />;
}
