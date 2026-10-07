// src/api/themes.ts
import { api } from './client'
import type {
  BuildId, PageParams, Platform, Theme, ThemeBuildCreateResponse, ThemeBuildStatus,
  ThemeDownloadResponse, ThemeUpsertRequest,
} from './types'

// 전체 테마 목록 조회
export const getThemes = (params?: PageParams) =>
  api.get<Theme[]>('/api/themes', { params }).then((r) => r.data)

// 특정 유저의 테마 목록 조회
export const getThemesByUser = (publicUserId: string, params?: PageParams) =>
  api.get<Theme[]>(`/api/themes/user/${encodeURIComponent(publicUserId)}`, { params }).then((r) => r.data)

// 테마 단건 조회
export const getTheme = (themeId: number) =>
  api.get<Theme>(`/api/themes/${themeId}`).then((r) => r.data)

// 새 테마 임시 저장
export const createTheme = (body: ThemeUpsertRequest) =>
  api.post<Theme>('/api/themes', body).then((r) => r.data)

// 기존 테마 임시 저장
export const updateTheme = (themeId: number, body: ThemeUpsertRequest) =>
  api.put<void>(`/api/themes/${themeId}`, body).then((r) => r.data)

// 테마 복사 (재다운로드용 소유 목록 저장)
export const cloneTheme = (body: ThemeUpsertRequest) =>
  api.post<Theme>('/api/themes/clone', body).then((r) => r.data)

// 테마 빌드 시작 (buildId 반환)
export const buildTheme = (themeId: number) =>
  api.post<ThemeBuildCreateResponse>(`/api/themes/${themeId}/builds`).then((r) => r.data)

// 테마 빌드 상태 조회
export const getThemeBuild = (buildId: BuildId) =>
  api.get<ThemeBuildStatus>(`/api/theme-builds/${buildId}`).then((r) => r.data)

// 빌드된 테마의 다운로드 URL 조회
export const getThemeDownload = (themeId: number, platform: Platform) =>
  api
    .get<ThemeDownloadResponse>(`/api/themes/${themeId}/download`, { params: { platform } })
    .then((r) => r.data)
