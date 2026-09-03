import {
  STARTER_SCENARIOS,
  portfolioValue,
  type Portfolio,
  type ScenarioShock,
} from "@core/index";
import { formatMoney } from "@core/money";

const base: Portfolio = {
  id: "stress",
  name: "스트레스 테스트",
  asOf: new Date().toISOString().slice(0, 10),
  holdings: [
    {
      id: "e",
      symbol: "EQ",
      name: "Equity sleeve",
      assetClass: "etf",
      quantity: 1,
      costBasis: { amount: 70_000_000, currency: "KRW" },
      marketPrice: { amount: 70_000_000, currency: "KRW" },
    },
    {
      id: "c",
      symbol: "CASH",
      name: "Cash",
      assetClass: "cash",
      quantity: 1,
      costBasis: { amount: 30_000_000, currency: "KRW" },
      marketPrice: { amount: 30_000_000, currency: "KRW" },
    },
  ],
};

export function applyScenario(shock: ScenarioShock): {
  label: string;
  before: string;
  after: string;
  changePct: string;
} {
  const before = portfolioValue(base);
  const shocked: Portfolio = {
    ...base,
    holdings: base.holdings.map((h) => {
      if (h.assetClass === "cash") return h;
      return {
        ...h,
        marketPrice: {
          ...h.marketPrice,
          amount: h.marketPrice.amount * shock.equityMultiplier,
        },
      };
    }),
  };
  const after = portfolioValue(shocked);
  const change = ((after.amount - before.amount) / before.amount) * 100;
  return {
    label: shock.label,
    before: formatMoney(before),
    after: formatMoney(after),
    changePct: `${change.toFixed(1)}%`,
  };
}

export function listScenarioDemos() {
  return STARTER_SCENARIOS.map(applyScenario);
}
