// src/hooks/useMyBoards.ts
import { useQuery } from "@tanstack/react-query";
import { getThemeBoards } from "@/api/themeBoards";
import useMe from "./useMe";

// ⚠️ 테마 응답(ThemeComponentDto)에 좋아요 수가 없어서, 게시글 목록에서 내 글을 찾아 테마별 좋아요 수를 구함
// (최근 게시글 100개 범위 안의 내 글만 반영됨 → 백엔드에 "테마 응답에 좋아요 수 추가" 요청 필요)
const FETCH_SIZE = 100;

// 내가 쓴 테마 게시글 목록 조회 훅 (enabled가 true일 때만 요청)
export default function useMyThemeBoards(enabled = true) {
  const { data: me } = useMe();
  const email = me?.userEmail ?? "";

  return useQuery({
    queryKey: ["theme-boards", "mine", email],
    // 최근 게시글 요청
    queryFn: () => getThemeBoards({ page: 0, size: FETCH_SIZE }),
    enabled: enabled && email !== "",
    // 내 이메일의 게시글만 남김
    select: (boards) => boards.filter((board) => board.userEmail === email),
  });
}