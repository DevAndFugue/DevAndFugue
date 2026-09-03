import type { Money } from "./money";

export type AssetClass =
  | "equity"
  | "etf"
  | "bond"
  | "cash"
  | "real_estate"
  | "crypto"
  | "other";

export type Holding = {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  quantity: number;
  costBasis: Money;
  marketPrice: Money;
};

export type Portfolio = {
  id: string;
  name: string;
  holdings: Holding[];
  asOf: string; // ISO date
};

export type TargetAllocation = {
  symbol: string;
  targetWeight: number; // 0–1
};

export function holdingMarketValue(h: Holding): Money {
  return {
    amount: h.quantity * h.marketPrice.amount,
    currency: h.marketPrice.currency,
  };
}

export function portfolioValue(p: Portfolio): Money {
  if (p.holdings.length === 0) {
    return { amount: 0, currency: "KRW" };
  }
  const currency = p.holdings[0].marketPrice.currency;
  const amount = p.holdings.reduce(
    (sum, h) => sum + holdingMarketValue(h).amount,
    0,
  );
  return { amount, currency };
}

export function holdingWeight(h: Holding, total: Money): number {
  if (total.amount === 0) return 0;
  return holdingMarketValue(h).amount / total.amount;
}
