// src/api/themeBoards.ts
import { api } from './client'
import { createBoardApi } from './boardApi'
import type {
  BoardListParams, PageParams, ThemeBoardCreate, ThemeBoardDetail, ThemeBoardDetailItem, ThemeBoardPreview,
} from './types'

const themeBoardApi = createBoardApi<
  BoardListParams, ThemeBoardPreview, ThemeBoardDetail, ThemeBoardCreate
>('/api/theme-boards')

// 테마 게시글 목록 조회
export const getThemeBoards = themeBoardApi.list

// 테마 게시글 상세 조회 (팔로우 여부 포함)
export const getThemeBoard = themeBoardApi.detail

// 테마 게시글 작성 (multipart: board_info + preview_image)
export const createThemeBoard = themeBoardApi.create

// 테마 게시글 삭제 (내가 쓴 글만)
export const deleteThemeBoard = (postId: number) =>
  api.delete<void>(`/api/theme-boards/${postId}`).then((r) => r.data)

// 테마 게시글 상세 목록 조회 (비로그인도 가능)
export const getThemeBoardDetails = (params?: PageParams) =>
  api.get<ThemeBoardDetailItem[]>('/api/theme-boards/details', { params }).then((r) => r.data)