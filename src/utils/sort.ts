// src/utils/sort.ts
// 생성일(createdAt)이 최신인 항목이 앞에 오도록 정렬한 새 배열 반환
export function sortByLatest<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
