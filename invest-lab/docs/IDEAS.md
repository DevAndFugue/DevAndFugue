# Invest Lab — 아이디어 20

## Batch 1 (실용)

1. 가계부 + 자산 스냅샷 → `networth`
2. 배당 캘린더 → `dividends`
3. 환율·금리 알림 → `alerts`
4. 뉴스 감성 vs 주가 → `sentiment`
5. 은퇴 시뮬레이터 → `retirement` *(MVP)*
6. ETF 비용 비교기 → `etf-compare`
7. 부동산 vs 주식 기회비용 → `housing`
8. 거시 지표 한 장 → `macro-board`
9. 리밸런싱 계산기 → `rebalance` *(MVP)*
10. 투자 일기 + 사후검증 → `journal`

## Batch 2 (참신)

11. 투자 페르소나 미러 → `persona` — 수익률이 아니라 행동 유형이 제품 핵심
12. 기회비용 영수증 → `opportunity-cost` — 지출을 가상 ETF 평가액으로 환산
13. 거시 스토리보드 → `scenarios` *(MVP)* — 시나리오 카드로 스트레스 테스트
14. 가설 베팅 클럽 → `hypotheses` — 가격이 아닌 거시·정책 가설 포지션
15. 세금 드래그 시각화 → `tax-drag` *(MVP)* — 매매 빈도의 복리 비용
16. 로컬 경제 레이더 → `local-radar` — 생활권 상권 센티먼트
17. 반대 의견 생성기 → `contrarian` — 확증편향 정면 돌파
18. 현금흐름 악보 → `cashflow-score` — 재무를 리듬·밀도 메타포로
19. FOMO 쿨다운 타이머 → `fomo` — 알림이 아니라 개입 지연
20. 세대 자산 전달 시뮬 → `legacy` — 다세대 현금흐름

## 추천 구현 순서 (첫 스프린트)

1. `retirement` / `rebalance` (이미 MVP)로 코어 검증
2. `tax-drag` + `opportunity-cost`로 “행동 비용” 테마 확장
3. `journal` + `contrarian` + `fomo`로 행동금융 묶음
4. 데이터 연동이 필요해지는 `alerts` / `sentiment` / `local-radar`는 뒤로
