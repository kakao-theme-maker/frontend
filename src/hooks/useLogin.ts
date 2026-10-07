// src/hooks/useLogin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn } from "@/api/auth";

// 로그인 후 돌아갈 경로 (가드/로그인 링크가 location.state.from에 담아 둠, 없거나 /login이면 홈)
export function useRedirectPath() {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  return from && from !== "/login" ? from : "/";
}

// 로그인 훅 (성공 시 내 정보를 갱신하고, 보호 페이지에서 왔다면 그 페이지로 이동)
export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const from = useRedirectPath();

  return useMutation({
    mutationFn: signIn,
    // 로그인 후 내 정보 캐시를 새로 불러오고 이동
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate(from, { replace: true });
    },
  });
}
