// src/components/auth/LoginCard.tsx
import { Link } from "react-router-dom";
import AuthDivider from "@/components/auth/AuthDivider";
import KakaoLoginButton from "@/components/auth/KakaoLoginButton";
import LoginForm from "@/components/auth/LoginForm";
import { AUTH_PATHS } from "@/config/auth";

// 로그인 폼, 소셜 로그인, 회원가입 링크를 담은 카드 컴포넌트
export default function LoginCard() {
  return (
    <section
      aria-labelledby="login-title"
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(3,82,255,0.06)] sm:p-8 lg:min-h-[560px]"
    >
      <h1 id="login-title" className="mb-6 text-xl font-bold sm:text-2xl">
        로그인
      </h1>

      <LoginForm />

      <div className="my-6">
        <AuthDivider />
      </div>

      <KakaoLoginButton />

      <p className="mt-5 text-center text-sm text-muted sm:text-base">
        아직 계정이 없으신가요?{" "}
        <Link to={AUTH_PATHS.signUp} className="font-bold text-primary underline">
          회원가입
        </Link>
      </p>
    </section>
  );
}
