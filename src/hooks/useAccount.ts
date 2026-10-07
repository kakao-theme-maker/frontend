// src/hooks/useAccount.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signOut } from "@/api/auth";
import { changePassword, updateUserName } from "@/api/users";

// 로그아웃 훅 (성공 시 캐시를 비우고 홈으로 이동)
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut,
    // 로그인 상태 캐시 제거 후 홈으로 이동
    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
  });
}

// 이름 수정 훅
export function useUpdateName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => updateUserName({ name }),
    // 내 정보 캐시 갱신
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
}

// 비밀번호 변경 훅
export function useChangePassword() {
  return useMutation({ mutationFn: changePassword });
}
