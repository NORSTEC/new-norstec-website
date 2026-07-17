import type {Money as MoneyValue} from "@/types/merch";

export function formatMoney(money?: MoneyValue | null) {
  if (!money) return "Price unavailable";
  return new Intl.NumberFormat("en-NO", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

export default function Money({value}: {value?: MoneyValue | null}) {
  return <>{formatMoney(value)}</>;
}
