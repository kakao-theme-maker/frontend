// src/pages/Login.tsx
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import QueryStatus from "@/components/common/QueryStatus";
import { kakaoLogin } from "@/config/auth";
import { useRedirectPath } from "@/hooks/useLogin";
import useMe from "@/hooks/useMe";

// 로그인 페이지 (화면 없이 바로 카카오 로그인으로 이동)
export default function Login() {
  const { data: me, isLoading } = useMe();
  const redirectPath = useRedirectPath();

  useEffect(() => {
    if (!isLoading && !me) kakaoLogin(redirectPath);
  }, [isLoading, me, redirectPath]);

  // 이미 로그인한 상태면 원래 가려던 곳(없으면 홈)으로 이동
  if (me) return <Navigate to={redirectPath} replace />;

  return (
    <PageContainer>
      <QueryStatus isLoading isError={false} />
    </PageContainer>
  );
}