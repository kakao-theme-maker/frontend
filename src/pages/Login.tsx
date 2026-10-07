// src/pages/Login.tsx
import { Navigate } from "react-router-dom";
import LoginCard from "@/components/auth/LoginCard";
import LoginIllustration from "@/components/auth/LoginIllustration";
import PageContainer from "@/components/common/PageContainer";
import { useRedirectPath } from "@/hooks/useLogin";
import useMe from "@/hooks/useMe";

// 로그인 페이지 (왼쪽 일러스트 + 오른쪽 로그인 카드)
export default function Login() {
  const { data: me } = useMe();
  const redirectPath = useRedirectPath();

  // 이미 로그인한 상태면 원래 가려던 곳(없으면 홈)으로 이동
  if (me) return <Navigate to={redirectPath} replace />;

  return (
    <PageContainer>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <LoginIllustration />
        <LoginCard />
      </div>
    </PageContainer>
  );
}
