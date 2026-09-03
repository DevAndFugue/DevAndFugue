export type MacroIndicatorId =
  | "policy_rate"
  | "cpi_yoy"
  | "unemployment"
  | "usdkrw"
  | "credit_spread";

export type MacroPoint = {
  indicator: MacroIndicatorId;
  date: string;
  value: number;
  unit: string;
};

export type MacroSnapshot = {
  asOf: string;
  points: MacroPoint[];
};

export type ScenarioShock = {
  id: string;
  label: string;
  /** Multiplier on equity prices, e.g. 0.8 = -20% */
  equityMultiplier: number;
  rateDeltaBps: number;
  fxMultiplier: number;
};

export const STARTER_SCENARIOS: ScenarioShock[] = [
  {
    id: "rate_hike",
    label: "금리 급등",
    equityMultiplier: 0.88,
    rateDeltaBps: 100,
    fxMultiplier: 1.05,
  },
  {
    id: "recession",
    label: "경기 침체",
    equityMultiplier: 0.7,
    rateDeltaBps: -150,
    fxMultiplier: 1.1,
  },
  {
    id: "soft_landing",
    label: "연착륙",
    equityMultiplier: 1.08,
    rateDeltaBps: -50,
    fxMultiplier: 0.97,
  },
];
