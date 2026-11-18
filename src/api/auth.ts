// src/api/auth.ts
import { api } from './client'

// 로그아웃 요청
export const signOut = () =>
  api.post<string>('/api/auth/local/sign-out').then((r) => r.data)

// 게스트 토큰 발급/갱신 (비로그인 상태에서 테마 제작 등 게스트 허용 API를 쓰기 위한 토큰, 쿠키로 내려옴)
// 이미 일반 회원으로 인증된 상태에서 호출하면 서버가 예외를 반환함
export const createGuestToken = () =>
  api.post<void>('/api/guest-tokens').then((r) => r.data)