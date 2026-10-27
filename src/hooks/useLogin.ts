// src/hooks/useLogin.ts
import { useLocation } from "react-router-dom";

// 로그인 후 돌아갈 경로 (가드/로그인 링크가 location.state.from에 담아 둠, 없거나 /login이면 홈)
export function useRedirectPath() {
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  return from && from !== "/login" ? from : "/";
}
