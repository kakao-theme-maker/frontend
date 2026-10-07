// src/hooks/useThemeBoards.ts
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bookmarkPost, createPostComment, deletePostComment, getPostComments, preferPost,
  unbookmarkPost, unpreferPost, updatePostComment,
} from "@/api/posts";
import { createThemeBoard, getThemeBoard, getThemeBoards } from "@/api/themeBoards";
import type { ThemeBoardCreate } from "@/api/types";

const PAGE_SIZE = 18;

// 테마 게시글 목록(검색어, 더 불러오기) 조회 훅
export function useThemeBoardList(keyword: string, sort?: string[]) {
  return useInfiniteQuery({
    queryKey: ["theme-boards", keyword, sort],
    // 페이지 단위로 테마 게시글 목록 요청
    queryFn: ({ pageParam }) =>
      getThemeBoards({ keyword: keyword || undefined, page: pageParam, size: PAGE_SIZE, sort }),
    initialPageParam: 0,
    // 마지막 페이지가 가득 찼으면 다음 페이지 번호 반환
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
}

// 첫 페이지의 테마 게시글 일부만 가져오는 훅 (비로그인 홈 미리보기용)
export function useThemeBoardPreview(size: number) {
  return useQuery({
    queryKey: ["theme-boards", "preview", size],
    // 첫 페이지 요청
    queryFn: () => getThemeBoards({ page: 0, size }),
  });
}

// 테마 게시글 상세 조회 훅
export function useThemeBoard(postId?: number) {
  return useQuery({
    queryKey: ["theme-boards", "detail", postId],
    // 게시글 한 건 요청
    queryFn: () => getThemeBoard(postId as number),
    enabled: postId !== undefined,
  });
}

// 테마 게시글 작성 요청 훅
export function useCreateThemeBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    // 게시글 작성 요청 전송
    mutationFn: (boardInfo: ThemeBoardCreate) => createThemeBoard(boardInfo),
    // 작성 후 게시글 목록 캐시 무효화
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["theme-boards"] }),
  });
}

// 상세/댓글 캐시 키
const detailKey = (postId: number) => ["theme-boards", "detail", postId] as const;
const commentsKey = (postId: number) => ["theme-boards", "comments", postId] as const;

const COMMENT_PAGE_SIZE = 100;

// 좋아요 토글 훅 (인자: 현재 좋아요 여부)
export function useToggleLike(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (liked: boolean) => (liked ? unpreferPost(postId) : preferPost(postId)),
    // 상세 캐시 갱신
    onSuccess: () => queryClient.invalidateQueries({ queryKey: detailKey(postId) }),
  });
}

// 북마크 토글 훅 (인자: 현재 북마크 여부)
export function useToggleBookmark(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarked: boolean) =>
      bookmarked ? unbookmarkPost(postId) : bookmarkPost(postId),
    // 상세 캐시 갱신
    onSuccess: () => queryClient.invalidateQueries({ queryKey: detailKey(postId) }),
  });
}

// 댓글 목록 조회 훅
export function useThemeBoardComments(postId?: number) {
  return useQuery({
    queryKey: postId === undefined ? ["theme-boards", "comments"] : commentsKey(postId),
    queryFn: () => getPostComments(postId as number, { size: COMMENT_PAGE_SIZE }),
    enabled: postId !== undefined,
  });
}

// 댓글 작성 훅
export function useCreateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createPostComment(postId, { content }),
    // 댓글 목록과 댓글 수 갱신
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKey(postId) });
      queryClient.invalidateQueries({ queryKey: detailKey(postId) });
    },
  });
}

// 댓글 삭제 훅
export function useDeleteComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deletePostComment(commentId),
    // 댓글 목록과 댓글 수 갱신
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKey(postId) });
      queryClient.invalidateQueries({ queryKey: detailKey(postId) });
    },
  });
}

// 댓글 수정 훅
export function useUpdateComment(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updatePostComment(commentId, content),
    // 댓글 목록 갱신
    onSuccess: () => queryClient.invalidateQueries({ queryKey: commentsKey(postId) }),
  });
}
