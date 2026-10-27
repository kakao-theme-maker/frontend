// src/config/auth.ts

// 카카오 로그인 시작 주소 (redirect: 로그인이 끝난 뒤 백엔드가 돌려보낼 프론트 주소, 없으면 백엔드 기본 주소로 이동함)
export const getKakaoLoginUrl = (redirectUrl: string) =>
  `${import.meta.env.VITE_API_BASE_URL ?? ""}/oauth2/authorization/kakao?redirect=${encodeURIComponent(redirectUrl)}`;

// 카카오 로그인 바로 시작 (로그인 페이지를 거치지 않고 OAuth 주소로 이동, path: 로그인 후 돌아올 프론트 경로)
export const kakaoLogin = (path: string = "/") => {
  const target = path.startsWith("/login") ? "/" : path;
  window.location.href = getKakaoLoginUrl(`${window.location.origin}${target}`);
};