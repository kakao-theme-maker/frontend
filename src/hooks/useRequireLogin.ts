// src/hooks/useRequireLogin.ts
import { useLocation, useNavigate } from "react-router-dom";
import useMe from "./useMe";

// 로그인이 필요한 동작을 감싸는 훅 (비로그인이면 로그인 페이지로 이동하고, 로그인 후 현재 페이지로 복귀)
export default function useRequireLogin() {
  const { data: me } = useMe();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  return (action: () => void) => {
    if (me) {
      action();
      return;
    }
    navigate("/login", { state: { from: pathname + search } });
  };
}
