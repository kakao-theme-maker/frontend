// src/hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/users";

// 현재 로그인한 사용자 정보 조회 훅
export default function useMe() {
  return useQuery({ queryKey: ["me"], queryFn: getMe, retry: false });
}
