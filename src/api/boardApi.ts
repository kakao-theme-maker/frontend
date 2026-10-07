// src/api/boardApi.ts
import { api, buildFormData } from './client'

// 게시판 공통 API(목록/상세/작성) 생성
export const createBoardApi = <TParams, TPreview, TDetail, TCreate>(basePath: string) => ({
  // 게시글 목록 조회
  list: (params?: TParams) =>
    api.get<TPreview[]>(basePath, { params }).then((r) => r.data),

  // 게시글 상세 조회
  detail: (postId: number) =>
    api.get<TDetail>(`${basePath}/${postId}`).then((r) => r.data),

  // 게시글 작성 (multipart: board_info + preview_image)
  create: (boardInfo: TCreate, previewImage?: File | null) =>
    api
      .post<TDetail>(
        basePath,
        buildFormData({ key: 'board_info', value: boardInfo }, { key: 'preview_image', value: previewImage }),
      )
      .then((r) => r.data),
})
