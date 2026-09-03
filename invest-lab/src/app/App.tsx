import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./Shell";
import { CatalogPage } from "./pages/CatalogPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { RetirementLabPage } from "./pages/RetirementLabPage";
import { RebalanceLabPage } from "./pages/RebalanceLabPage";
import { TaxDragLabPage } from "./pages/TaxDragLabPage";
import { ScenariosLabPage } from "./pages/ScenariosLabPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<CatalogPage />} />
          <Route path="architecture" element={<ArchitecturePage />} />
          <Route path="lab/retirement" element={<RetirementLabPage />} />
          <Route path="lab/rebalance" element={<RebalanceLabPage />} />
          <Route path="lab/tax-drag" element={<TaxDragLabPage />} />
          <Route path="lab/scenarios" element={<ScenariosLabPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
