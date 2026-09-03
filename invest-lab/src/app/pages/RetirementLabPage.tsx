import { useState, type ChangeEvent } from "react";
import {
  defaultRetirementInputs,
  runRetirementDemo,
  type RetirementInputs,
} from "@features/retirement/demo";
import "./lab.css";

function formatKrw(n: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(n);
}

export function RetirementLabPage() {
  const [inputs, setInputs] = useState<RetirementInputs>(defaultRetirementInputs);
  const result = runRetirementDemo(inputs);

  const set =
    (key: keyof RetirementInputs) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputs((prev) => ({ ...prev, [key]: Number(e.target.value) }));
    };

  return (
    <div className="lab">
      <h1>은퇴 시뮬레이터</h1>
      <p className="lab__lead">
        저축기 → 인출기 잔액 경로. 코어 함수 <code>simulateRetirement</code> 데모.
      </p>

      <div className="lab__grid">
        <label>
          시작 자산
          <input
            type="number"
            value={inputs.startingBalance}
            onChange={set("startingBalance")}
          />
        </label>
        <label>
          연간 저축
          <input
            type="number"
            value={inputs.annualContribution}
            onChange={set("annualContribution")}
          />
        </label>
        <label>
          저축 연수
          <input
            type="number"
            value={inputs.accumulationYears}
            onChange={set("accumulationYears")}
          />
        </label>
        <label>
          인출 연수
          <input
            type="number"
            value={inputs.withdrawalYears}
            onChange={set("withdrawalYears")}
          />
        </label>
        <label>
          기대 수익률 (%)
          <input
            type="number"
            step="0.1"
            value={inputs.annualReturnPct}
            onChange={set("annualReturnPct")}
          />
        </label>
        <label>
          연간 인출
          <input
            type="number"
            value={inputs.annualWithdrawal}
            onChange={set("annualWithdrawal")}
          />
        </label>
      </div>

      <div className="lab__stats">
        <div>
          <span>최고 잔액</span>
          <strong>{formatKrw(result.peak)}</strong>
        </div>
        <div>
          <span>최종 잔액</span>
          <strong>{formatKrw(result.final)}</strong>
        </div>
        <div>
          <span>고갈 시점</span>
          <strong>
            {result.depletedYear ? `${result.depletedYear}년차` : "유지"}
          </strong>
        </div>
      </div>

      <Sparkline
        values={result.path.map((p) => Math.max(0, p.balance))}
        label="잔액 경로"
      />
    </div>
  );
}

function Sparkline({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(...values, 1);
  const w = 640;
  const h = 120;
  const pts = values
    .map((v, i) => {
      const x = (i / Math.max(values.length - 1, 1)) * w;
      const y = h - (v / max) * (h - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <figure className="lab__chart">
      <figcaption>{label}</figcaption>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          points={pts}
        />
      </svg>
    </figure>
  );
}
