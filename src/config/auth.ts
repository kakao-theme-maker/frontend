// src/config/auth.ts

// ⚠️ 추정: 카카오 로그인 시작 주소 (백엔드 OAuth2 엔드포인트 확인 필요)
export const KAKAO_LOGIN_URL = `${import.meta.env.VITE_API_BASE_URL ?? ""}/oauth2/authorization/kakao`;

// ⚠️ 아직 없는 페이지 경로 (페이지를 만들면 라우트 경로와 맞춰주세요)
export const AUTH_PATHS = {
  signUp: "/signup",
  findPassword: "/find-password",
} as const;
