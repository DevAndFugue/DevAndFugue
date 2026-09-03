import { cagr, taxDraggedCagr } from "@core/index";

export function runTaxDragDemo(params: {
  start: number;
  end: number;
  years: number;
  turnover: number;
  taxRate: number;
}) {
  const pretax = cagr(params.start, params.end, params.years);
  const afterTax = taxDraggedCagr(pretax, params.turnover, params.taxRate);
  return {
    pretaxCagrPct: pretax * 100,
    afterTaxCagrPct: afterTax * 100,
    dragPctPoints: (pretax - afterTax) * 100,
  };
}
