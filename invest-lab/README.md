# Invest Lab

경제·투자 사이드 프로젝트를 **같은 틀** 위에 하나씩 붙이기 위한 구현 골격입니다.

## 왜 이 구조인가

아이디어마다 앱을 새로 만들지 않고:

1. **core** — 금액·포트폴리오·원장·거시·계산식 (순수 TypeScript)
2. **catalog** — 아이디어 20개 메타데이터
3. **features** — 아이디어별 모듈 (MVP / scaffold)
4. **app** — React 셸·라우트

으로 분리해, 고른 아이디어만 깊게 구현하면 됩니다.

## 빠른 시작

```bash
cd invest-lab
npm install
npm run dev
```

## 아이디어 배치

| 배치 | 성격 | 개수 |
|------|------|------|
| batch 1 | 실용 기본기 | 10 |
| batch 2 | 참신·차별화 | 10 |

도메인: `personal_finance` · `portfolio` · `macro` · `behavior` · `simulation`

## 지금 돌아가는 MVP

- `/lab/retirement` — 은퇴 시뮬
- `/lab/rebalance` — 리밸런싱
- `/lab/tax-drag` — 세금 드래그
- `/lab/scenarios` — 거시 스토리보드

## 새 기능 붙이기

1. `src/catalog/ideas.ts`에 아이디어 추가
2. 필요 시 `src/core/`에 도메인·계산 추가 (UI import 금지)
3. `src/features/<module>/`에 로직
4. `src/features/registry.ts` + `src/app/App.tsx` 라우트 연결

자세한 맵은 앱의 **구조** 페이지 또는 `docs/IDEAS.md`를 참고하세요.

## 스택

React 19 · TypeScript · Vite · React Router
