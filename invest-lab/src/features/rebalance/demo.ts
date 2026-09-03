import {
  portfolioValue,
  suggestRebalance,
  type Portfolio,
  type TargetAllocation,
} from "@core/index";
import { formatMoney } from "@core/money";

const samplePortfolio: Portfolio = {
  id: "demo",
  name: "샘플 포트폴리오",
  asOf: new Date().toISOString().slice(0, 10),
  holdings: [
    {
      id: "1",
      symbol: "SPY",
      name: "S&P 500 ETF",
      assetClass: "etf",
      quantity: 10,
      costBasis: { amount: 4000, currency: "USD" },
      marketPrice: { amount: 520, currency: "USD" },
    },
    {
      id: "2",
      symbol: "AGG",
      name: "US Aggregate Bond",
      assetClass: "etf",
      quantity: 40,
      costBasis: { amount: 4000, currency: "USD" },
      marketPrice: { amount: 98, currency: "USD" },
    },
    {
      id: "3",
      symbol: "CASH",
      name: "Cash",
      assetClass: "cash",
      quantity: 1,
      costBasis: { amount: 2000, currency: "USD" },
      marketPrice: { amount: 2000, currency: "USD" },
    },
  ],
};

const targets: TargetAllocation[] = [
  { symbol: "SPY", targetWeight: 0.6 },
  { symbol: "AGG", targetWeight: 0.3 },
  { symbol: "CASH", targetWeight: 0.1 },
];

export function runRebalanceDemo() {
  const total = portfolioValue(samplePortfolio);
  const trades = suggestRebalance(samplePortfolio, targets);
  return {
    totalLabel: formatMoney(total, "en-US"),
    trades: trades.map((t) => ({
      ...t,
      notionalLabel: formatMoney(t.notional, "en-US"),
      currentPct: (t.currentWeight * 100).toFixed(1),
      targetPct: (t.targetWeight * 100).toFixed(1),
    })),
  };
}
