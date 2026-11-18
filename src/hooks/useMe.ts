// src/hooks/useMe.ts
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/users";
import { isGuestUser } from "@/utils/user";

// 현재 로그인한 사용자 정보 조회 훅
export default function useMe() {
  return useQuery({ queryKey: ["me"], queryFn: getMe, retry: false });
}

// 게스트가 아닌 로그인 회원만 반환하는 훅
export function useMember() {
  const query = useMe();
  const member = query.data && !isGuestUser(query.data) ? query.data : undefined;
  return { ...query, data: member };
}