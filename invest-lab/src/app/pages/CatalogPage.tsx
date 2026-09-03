import { Link } from "react-router-dom";
import {
  DOMAIN_LABEL,
  IDEAS,
  type IdeaDomain,
} from "@catalog/ideas";
import { featureRegistry } from "@features/registry";
import "./catalog.css";

const domains: IdeaDomain[] = [
  "personal_finance",
  "portfolio",
  "macro",
  "behavior",
  "simulation",
];

export function CatalogPage() {
  return (
    <div className="catalog">
      <section className="catalog__hero">
        <p className="catalog__eyebrow">경제 · 투자 사이드 프로젝트</p>
        <h1>Invest Lab</h1>
        <p className="catalog__lead">
          20개 아이디어를 5개 도메인으로 묶고, 공통 코어(금액·포트폴리오·시뮬) 위에
          기능 모듈로 붙이는 구현 틀입니다. MVP 4개는 바로 돌려볼 수 있습니다.
        </p>
      </section>

      <section className="catalog__mvp">
        <h2>바로 돌려보기</h2>
        <div className="catalog__mvp-row">
          {featureRegistry
            .filter((f) => f.readiness === "mvp")
            .map((f) => (
              <Link key={f.ideaId} to={f.nav.path} className="catalog__mvp-link">
                <span>{f.nav.label}</span>
                <small>{f.description}</small>
              </Link>
            ))}
        </div>
      </section>

      {domains.map((domain) => (
        <section key={domain} className="catalog__domain">
          <h2>{DOMAIN_LABEL[domain]}</h2>
          <ul className="catalog__list">
            {IDEAS.filter((i) => i.domain === domain).map((idea) => (
              <li key={idea.id}>
                <div className="catalog__item-top">
                  <strong>{idea.title}</strong>
                  <span className={`tag tag--${idea.batch}`}>
                    {idea.batch === 1 ? "기본" : "참신"}
                  </span>
                  <span className={`tag tag--status-${idea.status}`}>
                    {idea.status}
                  </span>
                </div>
                <p>{idea.oneLiner}</p>
                {idea.whyNovel ? (
                  <p className="catalog__novel">{idea.whyNovel}</p>
                ) : null}
                <code>features/{idea.module}</code>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
