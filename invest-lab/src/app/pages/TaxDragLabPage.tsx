import { useState } from "react";
import { runTaxDragDemo } from "@features/tax-drag/demo";
import "./lab.css";

export function TaxDragLabPage() {
  const [start, setStart] = useState(10_000);
  const [end, setEnd] = useState(26_000);
  const [years, setYears] = useState(10);
  const [turnover, setTurnover] = useState(0.5);
  const [taxRate, setTaxRate] = useState(0.22);

  const result = runTaxDragDemo({ start, end, years, turnover, taxRate });

  return (
    <div className="lab">
      <h1>세금 드래그</h1>
      <p className="lab__lead">
        매매 회전율(turnover)이 세전 CAGR을 얼마나 깎는지 체감합니다. 세금 자문이
        아닌 교육용 근사입니다.
      </p>

      <div className="lab__grid">
        <label>
          시작 가치
          <input
            type="number"
            value={start}
            onChange={(e) => setStart(Number(e.target.value))}
          />
        </label>
        <label>
          종료 가치
          <input
            type="number"
            value={end}
            onChange={(e) => setEnd(Number(e.target.value))}
          />
        </label>
        <label>
          기간 (년)
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>
        <label>
          연 회전율 (0–1)
          <input
            type="number"
            step="0.05"
            min={0}
            max={1}
            value={turnover}
            onChange={(e) => setTurnover(Number(e.target.value))}
          />
        </label>
        <label>
          실효 세율 (0–1)
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="lab__stats">
        <div>
          <span>세전 CAGR</span>
          <strong>{result.pretaxCagrPct.toFixed(2)}%</strong>
        </div>
        <div>
          <span>세금 반영 근사</span>
          <strong>{result.afterTaxCagrPct.toFixed(2)}%</strong>
        </div>
        <div>
          <span>드래그</span>
          <strong>−{result.dragPctPoints.toFixed(2)}%p</strong>
        </div>
      </div>
    </div>
  );
}
