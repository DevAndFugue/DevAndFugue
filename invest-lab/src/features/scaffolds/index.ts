/**
 * Scaffold stubs — 구현 진입점만 정의.
 * 실제 UI/데이터 소스는 각 아이디어를 고를 때 채운다.
 */

export type OpportunityReceiptInput = {
  spentKrw: number;
  purchaseDate: string;
  proxySymbol: string;
  proxyReturnSince: number; // cumulative return 0–1
};

export function opportunityCostValue(input: OpportunityReceiptInput): number {
  return input.spentKrw * (1 + input.proxyReturnSince);
}

export type FomoWatch = {
  symbol: string;
  notedAt: string;
  cooldownDays: number;
  checklist: string[];
};

export function cooldownEndsAt(watch: FomoWatch): Date {
  const d = new Date(watch.notedAt);
  d.setDate(d.getDate() + watch.cooldownDays);
  return d;
}

export function isCooldownActive(watch: FomoWatch, now = new Date()): boolean {
  return now < cooldownEndsAt(watch);
}

export type ContrarianBrief = {
  thesis: string;
  counterPoints: string[];
};

export function buildContrarianTemplate(thesis: string): ContrarianBrief {
  return {
    thesis,
    counterPoints: [
      "이 논리가 틀리려면 어떤 데이터가 필요한가?",
      "시장이 이미 반영한 부분은 무엇인가?",
      "시간 지평을 바꾸면 결론이 달라지는가?",
      "반대 포지션을 가진 합리적 투자자는 무엇을 믿는가?",
    ],
  };
}
