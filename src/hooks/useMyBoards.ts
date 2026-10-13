// src/hooks/useMyBoards.ts
import { useQuery } from "@tanstack/react-query";
import { getThemeBoards } from "@/api/themeBoards";
import useMe from "./useMe";

// TODO:: 백엔드에 "내 게시글 조회 API" 요청 필요
const FETCH_SIZE = 100;

// 내가 쓴 테마 게시글 목록 조회 훅
export default function useMyThemeBoards() {
  const { data: me } = useMe();
  const email = me?.user_email ?? "";

  return useQuery({
    queryKey: ["theme-boards", "mine", email],
    // 최신 게시글 요청
    queryFn: () => getThemeBoards({ page: 0, size: FETCH_SIZE, sort: ["createdAt,desc"] }),
    enabled: email !== "",
    // 내 이메일의 게시글만 남김
    select: (boards) => boards.filter((board) => board.user_email === email),
  });
}