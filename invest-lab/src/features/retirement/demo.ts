import { simulateRetirement } from "@core/index";

export type RetirementInputs = {
  startingBalance: number;
  annualContribution: number;
  accumulationYears: number;
  withdrawalYears: number;
  annualReturnPct: number;
  annualWithdrawal: number;
};

export const defaultRetirementInputs: RetirementInputs = {
  startingBalance: 50_000_000,
  annualContribution: 12_000_000,
  accumulationYears: 25,
  withdrawalYears: 30,
  annualReturnPct: 6,
  annualWithdrawal: 24_000_000,
};

export function runRetirementDemo(inputs: RetirementInputs) {
  const path = simulateRetirement({
    startingBalance: inputs.startingBalance,
    annualContribution: inputs.annualContribution,
    accumulationYears: inputs.accumulationYears,
    withdrawalYears: inputs.withdrawalYears,
    annualReturn: inputs.annualReturnPct / 100,
    annualWithdrawal: inputs.annualWithdrawal,
  });

  const peak = Math.max(...path.map((p) => p.balance));
  const final = path[path.length - 1]?.balance ?? 0;
  const depletedYear = path.find((p) => p.balance <= 0)?.year ?? null;

  return { path, peak, final, depletedYear };
}
