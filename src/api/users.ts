// src/api/users.ts
import { api } from './client'
import type { ChangePasswordRequest, UpdateNameRequest, UserResponse } from './types'

// 현재 로그인한 사용자 정보 조회
export const getMe = () =>
  api.get<UserResponse>('/api/users/me').then((r) => r.data)

// 이름 수정 (한줄소개를 저장하는 API는 아직 없음)
export const updateUserName = (body: UpdateNameRequest) =>
  api.patch('/api/users/me/name', body).then((r) => r.data)

// 비밀번호 변경 (현재 비밀번호 + 새 비밀번호)
export const changePassword = (body: ChangePasswordRequest) =>
  api.patch<string>('/api/users/me/password', body).then((r) => r.data)
