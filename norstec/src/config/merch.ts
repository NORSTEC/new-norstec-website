// Maximum quantity a customer can order of a single variant. Print-on-demand
// (Gelato) orders are made to order, so we cap per-line quantity to avoid
// accidental or abusive bulk orders. Change this one value to adjust the limit.
export const MAX_QUANTITY_PER_LINE = 10;
