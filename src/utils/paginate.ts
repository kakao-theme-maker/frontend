// src/utils/paginate.ts
// 목록을 페이지 단위로 잘라 현재 페이지 항목과 전체 페이지 수를 반환 (page는 1부터 시작, 범위를 벗어나면 보정)
export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const pageItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return { pageItems, currentPage, totalPages };
}
