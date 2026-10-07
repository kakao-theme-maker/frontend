// src/config/community.ts
export const COMMUNITY_FILTERS = [
  { title: "테마", items: ["테마"] },
  { title: "프로필 및 기본배경", items: ["기본 프로필", "메인 배경"] },
  { title: "채팅방", items: ["채팅창 배경", "말풍선"] },
  { title: "잠금화면", items: ["잠금 배경", "잠금 불릿", "잠금 프레스"] },
];

export const POST_TYPES = COMMUNITY_FILTERS.map((filter) => filter.title);

export const SORT_OPTIONS = ["최신순", "인기순"] as const;

export const THEME_SORT_OPTIONS = ["최신순", "오래된순"] as const;

// ⚠️ OpenAPI는 "property,(asc|desc)" 형식, 시트는 sort=latest|popular 로 서로 달라 확인 필요.
// (인기순 필드명 prefers는 추정. OpenAPI에는 별도 /api/theme-boards/popular도 있음)
export const SORT_PARAMS: Record<(typeof SORT_OPTIONS)[number], string[]> = {
  최신순: ["createdAt,desc"],
  인기순: ["prefers,desc"],
};
