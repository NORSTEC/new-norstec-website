import type {Metadata} from "next";
import {notFound} from "next/navigation";
import ClientMerchProductPage from "@/app/merch/[slug]/ClientMerchProductPage";
import {getMerchProductBySlug} from "@/sanity/fetch/SanityFetch";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const product = await getMerchProductBySlug(decodeURIComponent(slug).trim());
  return {
    title: product ? `${product.title} | NORSTEC merch` : "Merch | NORSTEC",
    description: product?.excerpt,
  };
}

export default async function MerchProductPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const product = await getMerchProductBySlug(decodeURIComponent(slug).trim());
  if (!product) notFound();

  return <ClientMerchProductPage product={product} />;
}
