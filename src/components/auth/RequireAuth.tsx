// src/components/auth/RequireAuth.tsx
import { isAxiosError } from "axios";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import QueryStatus from "@/components/common/QueryStatus";
import useMe from "@/hooks/useMe";

const UNAUTHORIZED_STATUS = [401, 403];

// 로그인이 필요한 라우트 가드 (비로그인이면 로그인 페이지로 보내고, 로그인 후 원래 주소로 돌아오도록 저장)
export default function RequireAuth() {
  const { data: me, isLoading, isError, error } = useMe();
  const { pathname, search } = useLocation();

  if (isLoading) {
    return (
      <PageContainer>
        <QueryStatus isLoading isError={false} />
      </PageContainer>
    );
  }

  if (me) return <Outlet />;

  // 인증 문제가 아닌 오류(네트워크, 서버 장애)는 로그인으로 보내지 않고 안내만 표시
  const isUnauthorized =
    isAxiosError(error) && error.response !== undefined && UNAUTHORIZED_STATUS.includes(error.response.status);
  if (isError && !isUnauthorized) {
    return (
      <PageContainer>
        <QueryStatus isLoading={false} isError />
      </PageContainer>
    );
  }

  return <Navigate to="/login" replace state={{ from: pathname + search }} />;
}
