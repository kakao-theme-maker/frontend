// src/components/auth/KakaoLoginButton.tsx
import { MessageCircle } from "lucide-react";
import { getKakaoLoginUrl } from "@/config/auth";
import { useRedirectPath } from "@/hooks/useLogin";

// 카카오 로그인 시작 버튼 컴포넌트 (로그인 후 돌아올 주소를 담아 OAuth 주소로 이동)
export default function KakaoLoginButton() {
  // 로그인 후 원래 가려던 페이지(없으면 홈)를 현재 접속 주소 기준의 전체 URL로 넘김
  const redirectPath = useRedirectPath();
  const loginUrl = getKakaoLoginUrl(`${window.location.origin}${redirectPath}`);

  return (
    <a
      href={`https://theme-maker-test.kro.kr/oauth2/authorization/kakao?redirect=http://localhost:5173`}
      className="flex w-full items-center justify-center gap-3 rounded-full bg-[#FEE500] px-5 py-3 text-base font-bold text-black transition-colors hover:bg-[#F5DC00]"
    >
      <MessageCircle size={20} fill="currentColor" aria-hidden="true" />
      카카오 로그인
    </a>
  );
}