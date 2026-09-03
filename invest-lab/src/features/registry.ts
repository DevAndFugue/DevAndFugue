import type { FeatureRegistry } from "./types";

/**
 * 아이디어 → 기능 모듈 레지스트리
 * MVP가 있는 모듈은 demos/ 페이지와 연결된다.
 */
export const featureRegistry: FeatureRegistry = [
  {
    ideaId: "retirement-sim",
    nav: { path: "/lab/retirement", label: "은퇴 시뮬" },
    readiness: "mvp",
    description: "core.simulateRetirement 데모",
  },
  {
    ideaId: "rebalance-calc",
    nav: { path: "/lab/rebalance", label: "리밸런싱" },
    readiness: "mvp",
    description: "core.suggestRebalance 데모",
  },
  {
    ideaId: "tax-drag-viz",
    nav: { path: "/lab/tax-drag", label: "세금 드래그" },
    readiness: "mvp",
    description: "core.taxDraggedCagr 데모",
  },
  {
    ideaId: "macro-storyboard",
    nav: { path: "/lab/scenarios", label: "거시 스토리보드" },
    readiness: "mvp",
    description: "시나리오 카드 스트레스 테스트",
  },
  {
    ideaId: "networth-dashboard",
    nav: { path: "/lab/networth", label: "순자산" },
    readiness: "scaffold",
    description: "LedgerSnapshot + netWorth 스텁",
  },
  {
    ideaId: "opportunity-receipt",
    nav: { path: "/lab/opportunity-cost", label: "기회비용" },
    readiness: "scaffold",
    description: "지출 → 가상 ETF 평가액",
  },
  {
    ideaId: "fomo-cooldown",
    nav: { path: "/lab/fomo", label: "FOMO 쿨다운" },
    readiness: "scaffold",
    description: "관심 종목 대기 타이머 스텁",
  },
  {
    ideaId: "contrarian-brief",
    nav: { path: "/lab/contrarian", label: "반대 의견" },
    readiness: "scaffold",
    description: "투자 논리 → 반박 템플릿",
  },
];
