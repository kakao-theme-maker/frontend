// src/api/themes.ts
import { api } from './client'
import type {
  BuildId, PageParams, Platform, Theme, ThemeBuildCreateResponse, ThemeBuildStatus,
  ThemeCloneRequest, ThemeDetailResponse, ThemeDownloadResponse, ThemeUpdateRequest,
} from './types'

// 공개된 테마 목록 조회
export const getPublicThemes = (params?: PageParams) =>
  api.get<Theme[]>('/api/themes/public', { params }).then((r) => r.data)

// 특정 유저의 테마 목록 조회
export const getThemesByUser = (publicUserId: string, params?: PageParams) =>
  api.get<Theme[]>(`/api/themes/user/${encodeURIComponent(publicUserId)}`, { params }).then((r) => r.data)

// 테마 단건 조회 (typeCode별 이미지, styleCode별 색상 포함)
export const getTheme = (themeId: number) =>
  api.get<ThemeDetailResponse>(`/api/themes/${themeId}`).then((r) => r.data)

// 새 테마 생성 (요청 본문 없음, 기본 이미지·색상이 채워진 테마를 반환)
export const createTheme = () =>
  api.post<ThemeDetailResponse>('/api/themes').then((r) => r.data)

// 기존 테마 수정 (이름, 이미지, 색상 중 바꿀 항목만 전달)
export const updateTheme = (themeId: number, body: ThemeUpdateRequest) =>
  api.put<void>(`/api/themes/${themeId}`, body).then((r) => r.data)

// 테마 복제 (이미지/색상 정보를 기반으로 새 테마 생성)
export const cloneTheme = (body: ThemeCloneRequest) =>
  api.post<ThemeDetailResponse>('/api/themes/clone', body).then((r) => r.data)

// 테마 패키지 빌드 시작 (플랫폼별)
export const buildTheme = (themeId: number, platform: Platform) =>
  api.post<ThemeBuildCreateResponse>(`/api/themes/${themeId}/builds`, { platform }).then((r) => r.data)

// 테마 빌드 상태 조회
export const getThemeBuild = (buildId: BuildId) =>
  api.get<ThemeBuildStatus>(`/api/theme-builds/${buildId}`).then((r) => r.data)

// 빌드된 테마의 다운로드 URL 조회
export const getThemeDownload = (themeId: number, platform: Platform) =>
  api
    .get<ThemeDownloadResponse>(`/api/themes/${themeId}/download`, { params: { platform } })
    .then((r) => r.data)

// 테마 삭제
export const deleteTheme = (themeId: number) =>
  api.delete<void>(`/api/themes/${themeId}`).then((r) => r.data)