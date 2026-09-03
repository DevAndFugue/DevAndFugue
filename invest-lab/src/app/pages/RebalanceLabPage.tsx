import { runRebalanceDemo } from "@features/rebalance/demo";
import "./lab.css";

export function RebalanceLabPage() {
  const { totalLabel, trades } = runRebalanceDemo();

  return (
    <div className="lab">
      <h1>리밸런싱 계산기</h1>
      <p className="lab__lead">
        샘플 포트폴리오 총액 {totalLabel}. 목표 비중 60/30/10 기준 제안.
      </p>
      <table className="lab__table">
        <thead>
          <tr>
            <th>심볼</th>
            <th>현재</th>
            <th>목표</th>
            <th>방향</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t) => (
            <tr key={t.symbol}>
              <td>{t.symbol}</td>
              <td>{t.currentPct}%</td>
              <td>{t.targetPct}%</td>
              <td className={`side side--${t.side}`}>{t.side}</td>
              <td>{t.notionalLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
