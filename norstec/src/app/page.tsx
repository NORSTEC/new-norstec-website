import {getHomePage, getInitiativesPage} from "@/sanity/fetch/SanityFetch";
import ClientHomePage from "@/app/ClientHomePage";


export default async function HomePage() {
  const homePage = await getHomePage();
  const initiatives = await getInitiativesPage()
  if (!homePage) {
    return (<p></p>);
  }
  console.log(homePage)
  console.log(initiatives)

  return <ClientHomePage data={homePage} />;
}
