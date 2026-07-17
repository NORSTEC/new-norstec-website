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
