// src/api/posts.ts
import { api } from './client'
import type { CommentCreate, CommentResponse, PageParams } from './types'

// 게시글 좋아요(추천) / 취소
export const preferPost = (postId: number) =>
  api.post<void>(`/api/posts/${postId}/prefer`).then((r) => r.data)
export const unpreferPost = (postId: number) =>
  api.delete<void>(`/api/posts/${postId}/prefer`).then((r) => r.data)

// 게시글 북마크 추가 / 제거
export const bookmarkPost = (postId: number) =>
  api.put<void>(`/api/bookmarks/posts/${postId}`).then((r) => r.data)
export const unbookmarkPost = (postId: number) =>
  api.delete<void>(`/api/bookmarks/posts/${postId}`).then((r) => r.data)

// 댓글 목록 조회 / 작성 / 삭제
export const getPostComments = (postId: number, params?: PageParams) =>
  api.get<CommentResponse[]>(`/api/posts/${postId}/comments`, { params }).then((r) => r.data)
export const createPostComment = (postId: number, body: CommentCreate) =>
  api.post<CommentResponse>(`/api/posts/${postId}/comments`, body).then((r) => r.data)
export const deletePostComment = (commentId: number) =>
  api.delete<CommentResponse>(`/api/posts/comments/${commentId}`).then((r) => r.data)

// 댓글 수정
export const updatePostComment = (commentId: number, content: string) =>
  api.put<CommentResponse>(`/api/posts/comments/${commentId}`, { content }).then((r) => r.data)
