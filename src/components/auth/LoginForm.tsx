// src/components/auth/LoginForm.tsx
import { isAxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthField from "@/components/auth/AuthField";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { AUTH_PATHS } from "@/config/auth";
import useLogin from "@/hooks/useLogin";

const CREDENTIAL_ERROR_STATUS = [400, 401, 403, 404];

// 로그인 실패 원인에 맞는 안내 문구 반환
function getErrorMessage(error: unknown) {
  if (isAxiosError(error) && error.response && CREDENTIAL_ERROR_STATUS.includes(error.response.status)) {
    return "이메일 또는 비밀번호를 확인해주세요.";
  }
  return "로그인에 실패했어요. 잠시 후 다시 시도해 주세요.";
}

// 이메일/비밀번호 로그인 폼 컴포넌트
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const canSubmit = email.trim() !== "" && password !== "" && !login.isPending;

  // 입력값이 모두 있을 때만 로그인 요청
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    login.mutate({ email: email.trim(), password });
  };

  return (
    <form aria-label="로그인" onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
      <AuthField
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력해주세요"
        autoComplete="email"
        autoFocus
        required
      />

      <AuthField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해주세요"
        autoComplete="current-password"
        required
        action={
          <Link to={AUTH_PATHS.findPassword} className="text-sm text-muted underline">
            비밀번호 찾기
          </Link>
        }
      />

      <Checkbox label="로그인 유지" name="remember" />

      {login.isError && (
        <p role="alert" className="text-sm text-danger">
          {getErrorMessage(login.error)}
        </p>
      )}

      <Button type="submit" size="xl" rounded="full" disabled={!canSubmit}>
        {login.isPending ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
