import type {Image} from "@/types/image/image";

export type MerchImage = Image & {
  alt?: string;
};

export type MerchProduct = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  description?: unknown[];
  images: MerchImage[];
  shopifyProductId: string;
  shopifyVariantId: string;
  price: Money;
  featured?: boolean;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type LocalCartLine = {
  variantId: string;
  quantity: number;
  title: string;
  price: Money;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type LocalCart = {
  lines: LocalCartLine[];
  totalQuantity: number;
  subtotal: Money | null;
};
