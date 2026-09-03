/**
 * 경제/투자 사이드 프로젝트 아이디어 카탈로그 (20개)
 * batch1 = 1차 추천, batch2 = 참신 추천
 */

export type IdeaDomain =
  | "personal_finance"
  | "portfolio"
  | "macro"
  | "behavior"
  | "simulation";

export type IdeaStatus = "scaffold" | "mvp" | "shipped";

export type Idea = {
  id: string;
  batch: 1 | 2;
  title: string;
  oneLiner: string;
  domain: IdeaDomain;
  /** Feature module path under src/features */
  module: string;
  status: IdeaStatus;
  whyNovel?: string;
};

export const DOMAIN_LABEL: Record<IdeaDomain, string> = {
  personal_finance: "개인재무",
  portfolio: "포트폴리오",
  macro: "거시·시장",
  behavior: "행동·심리",
  simulation: "시뮬레이션",
};

export const IDEAS: Idea[] = [
  // —— batch 1 ——
  {
    id: "networth-dashboard",
    batch: 1,
    title: "가계부 + 자산 스냅샷",
    oneLiner: "수입·지출과 순자산을 한 타임라인으로 추적",
    domain: "personal_finance",
    module: "networth",
    status: "scaffold",
  },
  {
    id: "dividend-calendar",
    batch: 1,
    title: "배당 캘린더",
    oneLiner: "배당락·지급일과 세후 예상 현금 합산",
    domain: "portfolio",
    module: "dividends",
    status: "scaffold",
  },
  {
    id: "fx-rate-alerts",
    batch: 1,
    title: "환율·금리 알림",
    oneLiner: "관심 구간 이탈 시 알림",
    domain: "macro",
    module: "alerts",
    status: "scaffold",
  },
  {
    id: "news-sentiment",
    batch: 1,
    title: "뉴스 감성 vs 주가",
    oneLiner: "헤드라인 톤과 단기 수익률을 겹쳐 보기",
    domain: "macro",
    module: "sentiment",
    status: "scaffold",
  },
  {
    id: "retirement-sim",
    batch: 1,
    title: "은퇴 시뮬레이터",
    oneLiner: "저축·수익률·인출률로 잔액 경로 시뮬레이션",
    domain: "simulation",
    module: "retirement",
    status: "mvp",
  },
  {
    id: "etf-cost-compare",
    batch: 1,
    title: "ETF 비용 비교기",
    oneLiner: "보수·추적오차·유동성을 같은 노출끼리 비교",
    domain: "portfolio",
    module: "etf-compare",
    status: "scaffold",
  },
  {
    id: "rent-vs-invest",
    batch: 1,
    title: "부동산 vs 주식 기회비용",
    oneLiner: "전세/월세/매수와 인덱스 투자를 동일 현금흐름으로 비교",
    domain: "simulation",
    module: "housing",
    status: "scaffold",
  },
  {
    id: "macro-onepager",
    batch: 1,
    title: "거시 지표 한 장",
    oneLiner: "금리·CPI·환율 등을 주간 스냅샷으로 저장",
    domain: "macro",
    module: "macro-board",
    status: "scaffold",
  },
  {
    id: "rebalance-calc",
    batch: 1,
    title: "리밸런싱 계산기",
    oneLiner: "목표 비중 대비 매수·매도 금액 제안",
    domain: "portfolio",
    module: "rebalance",
    status: "mvp",
  },
  {
    id: "trade-journal",
    batch: 1,
    title: "투자 일기 + 사후검증",
    oneLiner: "가설을 기록하고 N개월 후 적중 여부를 대조",
    domain: "behavior",
    module: "journal",
    status: "scaffold",
  },

  // —— batch 2 (참신) ——
  {
    id: "investor-persona",
    batch: 2,
    title: "투자 페르소나 미러",
    oneLiner: "거래 패턴으로 ‘나는 어떤 투자자인가’를 진단",
    domain: "behavior",
    module: "persona",
    status: "scaffold",
    whyNovel: "수익률이 아니라 행동 유형을 제품의 핵심으로 둠",
  },
  {
    id: "opportunity-receipt",
    batch: 2,
    title: "기회비용 영수증",
    oneLiner: "일상 지출을 ‘그때 산 ETF 평가액’으로 환산",
    domain: "personal_finance",
    module: "opportunity-cost",
    status: "scaffold",
    whyNovel: "가계부를 후회 엔진이 아닌 학습 엔진으로 뒤집음",
  },
  {
    id: "macro-storyboard",
    batch: 2,
    title: "거시 스토리보드",
    oneLiner: "시나리오 카드를 조합해 포트폴리오 스트레스 테스트",
    domain: "macro",
    module: "scenarios",
    status: "mvp",
    whyNovel: "지표 나열이 아니라 서사(카드) 단위로 충격을 조합",
  },
  {
    id: "hypothesis-club",
    batch: 2,
    title: "가설 베팅 클럽",
    oneLiner: "가격이 아니라 거시·정책 가설에 익명으로 포지션",
    domain: "behavior",
    module: "hypotheses",
    status: "scaffold",
    whyNovel: "종목 추천 커뮤니티가 아니라 예측 시장형 학습장",
  },
  {
    id: "tax-drag-viz",
    batch: 2,
    title: "세금 드래그 시각화",
    oneLiner: "매매 빈도가 CAGR을 얼마나 깎는지 보여 줌",
    domain: "simulation",
    module: "tax-drag",
    status: "mvp",
    whyNovel: "세금 계산기가 아니라 ‘행동 비용’을 복리로 체감",
  },
  {
    id: "local-radar",
    batch: 2,
    title: "로컬 경제 레이더",
    oneLiner: "동네 상권·공실·신규 개업을 센티먼트 신호로",
    domain: "macro",
    module: "local-radar",
    status: "scaffold",
    whyNovel: "국가 매크로가 아닌 생활권 단위 알파 탐색",
  },
  {
    id: "contrarian-brief",
    batch: 2,
    title: "반대 의견 생성기",
    oneLiner: "내 투자 논리를 입력하면 구조화된 반박을 출력",
    domain: "behavior",
    module: "contrarian",
    status: "scaffold",
    whyNovel: "확증편향을 제품 기능으로 정면 돌파",
  },
  {
    id: "cashflow-score",
    batch: 2,
    title: "현금흐름 악보",
    oneLiner: "월급·배당·이자·대출을 타임라인 스코어로 시각화",
    domain: "personal_finance",
    module: "cashflow-score",
    status: "scaffold",
    whyNovel: "표를 버리고 리듬·밀도 메타포로 재무를 감각화",
  },
  {
    id: "fomo-cooldown",
    batch: 2,
    title: "FOMO 쿨다운 타이머",
    oneLiner: "급등 관심 종목에 N일 대기 + 체크리스트 강제",
    domain: "behavior",
    module: "fomo",
    status: "scaffold",
    whyNovel: "알림을 늘리는 게 아니라 개입을 늦추는 제품",
  },
  {
    id: "legacy-sim",
    batch: 2,
    title: "세대 자산 전달 시뮬",
    oneLiner: "증여·상속 타이밍과 복리를 가족 단위로 시뮬레이션",
    domain: "simulation",
    module: "legacy",
    status: "scaffold",
    whyNovel: "개인 은퇴를 넘어 다세대 현금흐름으로 확장",
  },
];

export function ideasByDomain(domain: IdeaDomain): Idea[] {
  return IDEAS.filter((i) => i.domain === domain);
}

export function getIdea(id: string): Idea | undefined {
  return IDEAS.find((i) => i.id === id);
}
