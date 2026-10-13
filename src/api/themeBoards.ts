// src/api/themeBoards.ts
import { api } from './client'
import { createBoardApi } from './boardApi'
import type {
  BoardListParams, ThemeBoardCreate, ThemeBoardDetail, ThemeBoardPreview,
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