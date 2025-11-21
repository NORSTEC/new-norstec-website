import {getAboutPage} from "@/sanity/fetch/SanityFetch";
import AboutPageClient from "@/app/about/ClientAboutPage";


export default async function AboutPage() {
    const aboutPage= await getAboutPage();

    if (!aboutPage) {
        return (<p></p>);
    }

    return <AboutPageClient   page={aboutPage}/>;
}



