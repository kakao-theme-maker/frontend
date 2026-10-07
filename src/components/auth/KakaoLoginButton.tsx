// src/components/auth/KakaoLoginButton.tsx
import { MessageCircle } from "lucide-react";
import { KAKAO_LOGIN_URL } from "@/config/auth";

// 카카오 로그인 시작 버튼 컴포넌트 (OAuth 주소로 이동)
export default function KakaoLoginButton() {
  return (
    <a
      href={KAKAO_LOGIN_URL}
      className="flex w-full items-center justify-center gap-3 rounded-full bg-[#FEE500] px-5 py-3 text-base font-bold text-black transition-colors hover:bg-[#F5DC00]"
    >
      <MessageCircle size={20} fill="currentColor" aria-hidden="true" />
      카카오 로그인
    </a>
  );
}
