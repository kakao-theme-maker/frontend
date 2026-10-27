// src/api/auth.ts
import { api } from './client'

// 로그아웃 요청
export const signOut = () =>
  api.post<string>('/api/auth/local/sign-out').then((r) => r.data)
