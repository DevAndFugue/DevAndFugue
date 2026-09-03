import "./architecture.css";

const layers = [
  {
    name: "catalog/",
    desc: "아이디어 20개 메타데이터 (도메인·상태·모듈명)",
  },
  {
    name: "core/",
    desc: "Money, Portfolio, Ledger, Macro, 공통 계산식 — UI와 무관한 순수 TS",
  },
  {
    name: "features/*",
    desc: "아이디어별 모듈. MVP는 demo.ts, 나머지는 scaffolds 스텁",
  },
  {
    name: "app/",
    desc: "React 셸 + 라우트. 새 아이디어는 레지스트리에 path만 추가",
  },
];

const map = [
  ["개인재무", "networth, opportunity-cost, cashflow-score"],
  ["포트폴리오", "dividends, etf-compare, rebalance"],
  ["거시·시장", "alerts, sentiment, macro-board, scenarios, local-radar"],
  ["행동·심리", "journal, persona, hypotheses, contrarian, fomo"],
  ["시뮬레이션", "retirement, housing, tax-drag, legacy"],
];

export function ArchitecturePage() {
  return (
    <div className="arch">
      <h1>구현 틀</h1>
      <p className="arch__lead">
        한 앱에 기능을 몰아넣지 않고, <strong>코어 도메인</strong>을 공유한 채
        아이디어를 <strong>기능 모듈</strong>로 꽂는 구조입니다.
      </p>

      <ol className="arch__layers">
        {layers.map((l) => (
          <li key={l.name}>
            <code>{l.name}</code>
            <span>{l.desc}</span>
          </li>
        ))}
      </ol>

      <h2>도메인 → 모듈 맵</h2>
      <table className="arch__table">
        <thead>
          <tr>
            <th>도메인</th>
            <th>모듈</th>
          </tr>
        </thead>
        <tbody>
          {map.map(([d, m]) => (
            <tr key={d}>
              <td>{d}</td>
              <td>
                <code>{m}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>새 아이디어 붙이는 순서</h2>
      <ol className="arch__steps">
        <li>
          <code>catalog/ideas.ts</code>에 메타 추가
        </li>
        <li>
          필요하면 <code>core/</code>에 타입·계산 추가 (UI 금지)
        </li>
        <li>
          <code>features/&lt;module&gt;/</code>에 로직 작성
        </li>
        <li>
          <code>features/registry.ts</code> + 라우트에 연결
        </li>
      </ol>
    </div>
  );
}
