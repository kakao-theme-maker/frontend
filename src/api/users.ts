// src/api/users.ts
import { api } from './client'
import type {
  ChangePasswordRequest, CustomResponse, UserProfileUpdateRequest, UserResponse,
} from './types'

// 현재 로그인한 사용자 정보 조회
export const getMe = () =>
  api.get<UserResponse>('/api/users/me').then((r) => r.data)

// 이름/한줄소개 수정
export const updateUserProfile = (body: UserProfileUpdateRequest) =>
  api.patch<CustomResponse<UserResponse>>('/api/users/me', body).then((r) => r.data)

// 프로필 이미지 수정 (multipart: profileImage)
export const updateUserProfileImage = (file: File) => {
  const fd = new FormData()
  fd.append('profileImage', file)
  return api.patch<CustomResponse<UserResponse>>('/api/users/me/profile-image', fd).then((r) => r.data)
}

// 비밀번호 변경 (현재 비밀번호 + 새 비밀번호)
export const changePassword = (body: ChangePasswordRequest) =>
  api.patch<string>('/api/users/me/password', body).then((r) => r.data)