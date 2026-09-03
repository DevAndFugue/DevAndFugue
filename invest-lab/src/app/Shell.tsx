import { NavLink, Outlet } from "react-router-dom";
import { featureRegistry } from "@features/registry";
import "./shell.css";

export function Shell() {
  const mvp = featureRegistry.filter((f) => f.readiness === "mvp");

  return (
    <div className="shell">
      <header className="shell__header">
        <NavLink to="/" className="shell__brand">
          <span className="shell__mark">IL</span>
          <span className="shell__title">Invest Lab</span>
        </NavLink>
        <nav className="shell__nav" aria-label="주요 메뉴">
          <NavLink to="/" end>
            카탈로그
          </NavLink>
          <NavLink to="/architecture">구조</NavLink>
          {mvp.map((f) => (
            <NavLink key={f.ideaId} to={f.nav.path}>
              {f.nav.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="shell__main">
        <Outlet />
      </main>
      <footer className="shell__footer">
        도메인 코어 → 기능 모듈 → UI. 아이디어 20개를 같은 틀에 꽂는 사이드 프로젝트
        실험실.
      </footer>
    </div>
  );
}
