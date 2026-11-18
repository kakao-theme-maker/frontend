// src/components/auth/RequireAuthOrGuest.tsx
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Outlet } from "react-router-dom";
import { createGuestToken } from "@/api/auth";
import PageContainer from "@/components/common/PageContainer";
import QueryStatus from "@/components/common/QueryStatus";
import useMe from "@/hooks/useMe";

const UNAUTHORIZED_STATUS = [401, 403];

// 로그인 또는 게스트 토큰이 있어야 하는 라우트 가드 (테마 제작용)
// - 로그인한 사용자: 그대로 통과
// - 비로그인: 게스트 토큰을 한 번 발급받은 뒤 통과 (로그인 페이지로 보내지 않음)
export default function RequireAuthOrGuest() {
  const { data: me, isLoading, isError, error } = useMe();
  const { mutate: issueGuestToken, isSuccess, isError: guestFailed } = useMutation({ mutationFn: createGuestToken });
  const requested = useRef(false);

  const isUnauthorized =
    isAxiosError(error) && error.response !== undefined && UNAUTHORIZED_STATUS.includes(error.response.status);
  // 내 정보를 못 받았고 원인이 인증 문제일 때만 게스트로 진행 (네트워크·서버 장애는 제외)
  const needGuest = !isLoading && !me && isError && isUnauthorized;

  useEffect(() => {
    if (!needGuest || requested.current) return;
    requested.current = true; // StrictMode 중복 실행·재렌더로 여러 번 발급하지 않도록
    issueGuestToken();
  }, [needGuest, issueGuestToken]);

  if (me || isSuccess) return <Outlet />;

  // 인증 문제가 아닌 오류, 또는 게스트 토큰 발급 실패
  if ((isError && !isUnauthorized) || guestFailed) {
    return (
      <PageContainer>
        <QueryStatus isLoading={false} isError />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <QueryStatus isLoading isError={false} />
    </PageContainer>
  );
}