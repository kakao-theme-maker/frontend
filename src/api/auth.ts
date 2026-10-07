// src/api/auth.ts
import { api } from './client'
import type { LocalLoginRequest, UserAuthResponse } from './types'

// 이메일/비밀번호 로컬 로그인 요청
export const signIn = (body: LocalLoginRequest) =>
  api.post<UserAuthResponse>('/api/auth/local/sign-in', body).then((r) => r.data)


// 로그아웃 요청
export const signOut = () =>
  api.post<string>('/api/auth/local/sign-out').then((r) => r.data)
