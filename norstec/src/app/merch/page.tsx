import type {Metadata} from "next";
import ClientMerchPage from "@/app/merch/ClientMerchPage";
import {getMerchPage} from "@/sanity/fetch/SanityFetch";
import {getShopifyProducts} from "@/lib/shopify/storefront";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Merch | NORSTEC",
  description: "NORSTEC merch.",
};

export default async function MerchPage() {
  const [merchPage, products] = await Promise.all([getMerchPage(), getShopifyProducts()]);
  const hero =
    merchPage?.sections?.find((section) => section._type === "sectionHero") ?? null;

  return <ClientMerchPage hero={hero} products={products} />;
}
