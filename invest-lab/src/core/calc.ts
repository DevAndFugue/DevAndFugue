import type { Money } from "./money";
import type { Holding, TargetAllocation } from "./portfolio";
import { holdingMarketValue, portfolioValue, type Portfolio } from "./portfolio";

export type RebalanceTrade = {
  symbol: string;
  side: "buy" | "sell" | "hold";
  /** Signed cash amount to trade (buy > 0, sell < 0) */
  notional: Money;
  currentWeight: number;
  targetWeight: number;
};

/**
 * Cash-based rebalance suggestion (no fractional-share constraints).
 * Fee/tax drag can be layered later via TaxDrag feature.
 */
export function suggestRebalance(
  portfolio: Portfolio,
  targets: TargetAllocation[],
): RebalanceTrade[] {
  const total = portfolioValue(portfolio);
  const bySymbol = new Map(portfolio.holdings.map((h) => [h.symbol, h]));

  return targets.map((t) => {
    const holding = bySymbol.get(t.symbol);
    const currentValue = holding ? holdingMarketValue(holding).amount : 0;
    const currentWeight = total.amount === 0 ? 0 : currentValue / total.amount;
    const targetValue = total.amount * t.targetWeight;
    const delta = targetValue - currentValue;
    const side: RebalanceTrade["side"] =
      Math.abs(delta) < 1 ? "hold" : delta > 0 ? "buy" : "sell";

    return {
      symbol: t.symbol,
      side,
      notional: {
        amount: delta,
        currency: total.currency,
      },
      currentWeight,
      targetWeight: t.targetWeight,
    };
  });
}

/** Future value of lump sum with annual compounding */
export function futureValue(
  principal: number,
  annualRate: number,
  years: number,
): number {
  return principal * Math.pow(1 + annualRate, years);
}

/** Future value of regular contributions (end of period) */
export function futureValueAnnuity(
  contribution: number,
  annualRate: number,
  years: number,
  periodsPerYear = 12,
): number {
  const r = annualRate / periodsPerYear;
  const n = years * periodsPerYear;
  if (r === 0) return contribution * n;
  return contribution * ((Math.pow(1 + r, n) - 1) / r);
}

export type RetirementPathPoint = {
  year: number;
  balance: number;
};

/**
 * Simple accumulation + withdrawal path.
 * accumulationYears: work years; withdrawalYears: retirement years.
 */
export function simulateRetirement(params: {
  startingBalance: number;
  annualContribution: number;
  accumulationYears: number;
  withdrawalYears: number;
  annualReturn: number;
  annualWithdrawal: number;
}): RetirementPathPoint[] {
  const points: RetirementPathPoint[] = [];
  let balance = params.startingBalance;
  let year = 0;

  for (let i = 0; i < params.accumulationYears; i++) {
    balance = balance * (1 + params.annualReturn) + params.annualContribution;
    year += 1;
    points.push({ year, balance });
  }

  for (let i = 0; i < params.withdrawalYears; i++) {
    balance = balance * (1 + params.annualReturn) - params.annualWithdrawal;
    year += 1;
    points.push({ year, balance });
  }

  return points;
}

export function cagr(startValue: number, endValue: number, years: number): number {
  if (startValue <= 0 || years <= 0) return 0;
  return Math.pow(endValue / startValue, 1 / years) - 1;
}

/** Rough tax drag on CAGR from turnover (illustrative, not tax advice) */
export function taxDraggedCagr(
  pretaxCagr: number,
  turnover: number,
  taxRate: number,
): number {
  const drag = turnover * taxRate;
  return pretaxCagr * (1 - drag);
}

export type HoldingLike = Pick<Holding, "symbol" | "quantity" | "marketPrice">;
