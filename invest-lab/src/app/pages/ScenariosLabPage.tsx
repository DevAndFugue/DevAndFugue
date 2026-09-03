import { listScenarioDemos } from "@features/scenarios/demo";
import "./lab.css";

export function ScenariosLabPage() {
  const rows = listScenarioDemos();

  return (
    <div className="lab">
      <h1>거시 스토리보드</h1>
      <p className="lab__lead">
        시나리오 카드를 포트폴리오(주식 70% / 현금 30%)에 적용한 스트레스 테스트
        샘플입니다.
      </p>
      <div className="lab__cards">
        {rows.map((r) => (
          <article key={r.label} className="lab__card">
            <h2>{r.label}</h2>
            <p>
              {r.before} → <strong>{r.after}</strong>
            </p>
            <p className="lab__delta">{r.changePct}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
