/** ISO currency code — extend as needed */
export type CurrencyCode = "KRW" | "USD" | "EUR" | "JPY";

export type Money = {
  amount: number;
  currency: CurrencyCode;
};

export function money(amount: number, currency: CurrencyCode = "KRW"): Money {
  return { amount, currency };
}

export function assertSameCurrency(a: Money, b: Money): void {
  if (a.currency !== b.currency) {
    throw new Error(`Currency mismatch: ${a.currency} vs ${b.currency}`);
  }
}

export function add(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  return money(a.amount + b.amount, a.currency);
}

export function subtract(a: Money, b: Money): Money {
  assertSameCurrency(a, b);
  return money(a.amount - b.amount, a.currency);
}

export function multiply(m: Money, factor: number): Money {
  return money(m.amount * factor, m.currency);
}

export function formatMoney(m: Money, locale = "ko-KR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: m.currency === "KRW" ? 0 : 2,
  }).format(m.amount);
}
