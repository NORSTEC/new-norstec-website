import type { Metadata } from "next";
import ClientEsaFundingPage from "@/app/esa-funding/ClientEsaFundingPage";
import { getEsaFundingPage } from "@/sanity/fetch/SanityFetch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ESA Funding | NORSTEC",
  description:
    "Students at Norwegian universities and colleges can apply to NORSTEC for funding for ESA courses and conferences.",

  metadataBase: new URL("https://norstec.no"),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    title: "ESA Funding | NORSTEC",
    description:
      "Apply for funding for ESA courses and conferences. Open to all students at Norwegian universities and colleges.",
    url: "https://norstec.no/esa-funding",
  },
};

export default async function EsaFundingPage() {
  const esaFundingPage = await getEsaFundingPage();

  return <ClientEsaFundingPage data={esaFundingPage} />;
}
