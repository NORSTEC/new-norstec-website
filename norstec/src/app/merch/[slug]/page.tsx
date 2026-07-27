import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientMerchProductPage from "@/app/merch/[slug]/ClientMerchProductPage";
import { getShopifyProductByHandle } from "@/lib/shopify/storefront";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getShopifyProductByHandle(decodeURIComponent(slug).trim());
  return {
    title: product ? `${product.title} | NORSTEC merch` : "Merch | NORSTEC",
    description: product?.descriptionHtml?.replace(/<[^>]+>/g, "").slice(0, 160),
  };
}

export default async function MerchProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getShopifyProductByHandle(decodeURIComponent(slug).trim());
  if (!product) notFound();

  return <ClientMerchProductPage product={product} />;
}
