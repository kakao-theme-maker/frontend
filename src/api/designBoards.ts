// src/api/designBoards.ts
import { createBoardApi } from './boardApi'
import type {
  DesignBoardCreate, DesignBoardDetail, DesignBoardListParams, DesignBoardPreview,
} from './types'

const designBoardApi = createBoardApi<
  DesignBoardListParams, DesignBoardPreview, DesignBoardDetail, DesignBoardCreate
>('/api/design-boards')

// 디자인 게시글 목록 조회
export const getDesignBoards = designBoardApi.list

// 디자인 게시글 상세 조회
export const getDesignBoard = designBoardApi.detail

// 디자인 게시글 작성 (multipart: board_info + preview_image)
export const createDesignBoard = designBoardApi.create
