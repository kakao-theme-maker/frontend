// src/hooks/useMyPosts.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteThemeBoard } from "@/api/themeBoards";
import { getMyPreferredPosts, getMyUploadPosts } from "@/api/users";

// 한 번에 넉넉히 받아 프론트에서 정렬/페이지 처리 (서버 기본 크기는 20개)
const FETCH_SIZE = 100;
const PARAMS = { postType: "THEME_BOARD", page: 0, size: FETCH_SIZE } as const;

// 내가 쓴 테마 게시글 목록 조회 훅 (enabled가 true일 때만 요청)
export function useMyUploadPosts(enabled = true) {
  return useQuery({
    queryKey: ["posts", "mine"],
    // 내 게시글 요청
    queryFn: () => getMyUploadPosts(PARAMS),
    enabled,
  });
}

// 내가 좋아요한 테마 게시글 목록 조회 훅 (enabled가 true일 때만 요청)
export function useMyPreferredPosts(enabled = true) {
  return useQuery({
    queryKey: ["posts", "preferred"],
    // 좋아요한 게시글 요청
    queryFn: () => getMyPreferredPosts(PARAMS),
    enabled,
  });
}

// 내 테마 게시글 삭제 훅
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deleteThemeBoard(postId),
    // 게시글 목록과 내 정보(게시물 수) 캐시 갱신
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["theme-boards"] });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}