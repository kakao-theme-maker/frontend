// src/config/community.ts
export const SORT_OPTIONS = ["최신순", "인기순"] as const;

export const THEME_SORT_OPTIONS = ["최신순", "오래된순"] as const;

// ⚠️ OpenAPI는 "property,(asc|desc)" 형식, 시트는 sort=latest|popular 로 서로 달라 확인 필요.
// (인기순 필드명 prefers는 추정. OpenAPI에는 별도 /api/theme-boards/popular도 있음)
export const SORT_PARAMS: Record<(typeof SORT_OPTIONS)[number], string[]> = {
  최신순: ["createdAt,desc"],
  인기순: ["prefers,desc"],
};