/**
 * Feature module contract.
 * 각 아이디어는 이 인터페이스를 구현하는 모듈로 붙인다.
 */

import type { Idea } from "@catalog/ideas";

export type FeatureNavItem = {
  path: string;
  label: string;
};

export type FeatureModule = {
  ideaId: Idea["id"];
  nav: FeatureNavItem;
  /** short status shown in shell */
  readiness: "scaffold" | "mvp" | "shipped";
  /** optional demo entry — wire a React page later */
  description: string;
};

export type FeatureRegistry = FeatureModule[];
