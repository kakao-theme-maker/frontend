// src/config/community.ts
import type { BoardSortType } from "@/api/types";

export const SORT_OPTIONS = ["최신순", "인기순"] as const;

export const THEME_SORT_OPTIONS = ["최신순", "오래된순"] as const;

// 화면 정렬 옵션 → 서버 정렬 기준(sort_type)
export const SORT_TYPES: Record<(typeof SORT_OPTIONS)[number], BoardSortType> = {
  최신순: "CREATED_DESC",
  인기순: "PREFER_DESC",
};