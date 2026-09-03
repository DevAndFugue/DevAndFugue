import type { Money } from "./money";

export type TransactionKind =
  | "income"
  | "expense"
  | "buy"
  | "sell"
  | "dividend"
  | "transfer"
  | "fee"
  | "tax";

export type Transaction = {
  id: string;
  date: string; // ISO
  kind: TransactionKind;
  amount: Money;
  memo?: string;
  symbol?: string;
  tags?: string[];
};

export type LedgerSnapshot = {
  asOf: string;
  cash: Money;
  investments: Money;
  liabilities: Money;
};

export function netWorth(s: LedgerSnapshot): Money {
  return {
    amount: s.cash.amount + s.investments.amount - s.liabilities.amount,
    currency: s.cash.currency,
  };
}
