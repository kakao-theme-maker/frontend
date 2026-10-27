// src/api/types.ts
export type Platform = 'ANDROID' | 'IOS'

export interface PageParams {
  page?: number
  size?: number
  sort?: string[]
}

// 내 정보 (GET /api/users/me, 스웨거 UserResponseDto - camelCase)
export interface UserResponse {
  userEmail: string
  profileImage: string
  profileImageName: string
  name: string
  introduce?: string
  publicUserId: string
  createdAt: string
  followers: number
  following: number
  uploads: number
  gender: 'male' | 'female'
  birth: string
}

// 일부 사용자 API가 감싸서 내려주는 공통 응답 (CustomResponseUserResponseDto 등)
export interface CustomResponse<T> { status: number; message: string; data: T }

// PATCH /api/users/me (생략하거나 null이면 기존 값 유지, introduce를 빈 문자열로 보내면 소개 비움)
export interface UserProfileUpdateRequest { name?: string; introduce?: string }
// PATCH /api/users/me/password
export interface ChangePasswordRequest { currentPassword: string; newPassword: string }

// 댓글 (GET /api/posts/{postId}/comments)
export interface CommentResponse {
  commentId: number
  userEmail: string
  userName: string
  profileImageUrl?: string
  content: string
  likeCount: number
  createdAt: string
  isLiked: boolean
}
export interface CommentCreate { content: string }

// 디자인 컴포넌트(업로드한 이미지) 응답 (스웨거 DesignComponentDto - camelCase)
export interface DesignComponent {
  designComponentId: number
  publicUserId: string
  imageUrl: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

// 이미지 종류 (GET /api/component-types, 스웨거 ComponentTypeDto)
export type PlatformScope = 'common' | 'android' | 'ios'
export interface ComponentType {
  componentTypeId: number
  typeCode: string
  name: string
  explain: string
  platformScope: PlatformScope
}

// 테마 목록 항목 (스웨거 ThemeComponentDto)
export interface ThemeStyle {
  colorStyleId: number
  color: string
}
export interface ThemeImage {
  designComponentId: number
}
export interface Theme {
  themeComponentId: number
  userEmail: string
  themeName: string
  versionNumber: string
  versionName: string
  isDone: boolean
  isPublic: boolean
  createdAt: string
  previewImageUrl: string
  styles: ThemeStyle[]
  images: ThemeImage[]
}

// 말풍선 인셋 (이미지가 늘어나는 위치와 내용 여백)
export interface Inset {
  top: number
  left: number
  bottom: number
  right: number
  stretchX: number
  stretchY: number
}

// 테마 상세 (GET /api/themes/{id}, POST /api/themes 응답 - typeCode/styleCode별 맵)
export interface TypeCodeInfo {
  designComponentId: number
  imageUrl: string
  platformScope: PlatformScope
  typeCodeGroup: string
  typeCodeGroupName: string
  inset?: Inset | null
}
export interface StyleCodeInfo {
  color: string
  alpha: number
  platformScope: PlatformScope
}
export interface ThemeDetailResponse {
  themeComponentId: number
  themeName: string
  typeCodes: Record<string, TypeCodeInfo>
  styleCodes: Record<string, StyleCodeInfo>
}

// 테마 수정 요청 (PUT /api/themes/{id}) - 바꿀 항목만 담는다
export interface ThemeImageUpdateRequest {
  designComponentId?: number
  inset?: Partial<Inset>
}
export interface ThemeStyleUpdateRequest {
  color: string
  alpha: number
}
export interface ThemeUpdateRequest {
  themeName?: string
  typeCodes?: Record<string, ThemeImageUpdateRequest>
  styleCodes?: Record<string, ThemeStyleUpdateRequest>
}

// 테마 빌드 (POST /api/themes/{id}/builds, GET /api/theme-builds/{buildId})
export type BuildId = number
export type BuildStatus = 'RUNNING' | 'SUCCESS' | 'FAILED'
export interface ThemeBuildCreateResponse {
  buildId: BuildId
  themeComponentId: number
  platform: Platform
  status: BuildStatus
}
export interface ThemeBuildStatus {
  status: BuildStatus
  downloadUrl?: string
}
export interface ThemeDownloadResponse {
  downloadUrl: string
}

export interface TagCreate { tag_name: string }
export interface TagResponse { tagId: number; tagName: string }

// 테마 게시글 목록 정렬 기준 (스웨거 sort_type)
export type BoardSortType = 'CREATED_ASC' | 'CREATED_DESC' | 'PREFER_ASC' | 'PREFER_DESC'

// 테마 게시글 목록 조회 파라미터 (정렬은 sort가 아니라 sort_type 사용)
export interface BoardListParams {
  page?: number
  size?: number
  keyword?: string
  sort_type?: BoardSortType
}

export interface ThemeBoardCreate {
  title: string
  content: string
  themeComponentId?: number
  post_tags?: TagCreate[]
  public_flag?: boolean
}
// 테마 게시글 목록 항목 (스웨거 ThemeBoardPreviewDto - camelCase)
export interface ThemeBoardPreview {
  postId: number
  themeComponentId: number
  title: string
  previewImageUrl: string
  userEmail: string
  createdAt: string
  prefers: number
}

// 테마 게시글 상세 목록 항목 (스웨거 ThemeBoardDetailDto 중 목록에서 쓰는 필드 - camelCase, 비로그인도 조회 가능)
export interface ThemeBoardDetailItem {
  postId: number
  themeComponentId: number
  title: string
  previewImageUrl: string[]
  userEmail: string
  createdAt: string
  prefers: number
}

// 내 게시글 / 좋아요한 게시글 (스웨거 UserPostListResponseDto - camelCase)
export type PostType = 'THEME_BOARD'
export interface UserPostParams extends PageParams {
  postType?: PostType
}
export interface UserPost {
  postId: number
  postType: PostType
  title: string
  content: string
  tags: { tagId: number; tagName: string }[]
  previewImageUrl: string[]
  createdAt: string
  updatedAt: string
  authorName: string
  authorProfileImageUrl: string
  prefers: number
  comments: number
  preferred: boolean
  bookmarked: boolean
}
// 테마 게시글 상세 (스웨거 ThemeBoardDetailDto - camelCase)
export interface ThemeBoardDetail {
  postId: number
  title: string
  content: string
  themeComponentId: number
  userEmail: string
  userName: string
  createdAt: string
  previewImageUrl: string[]
  prefers: number
  comments: number
  tags: TagResponse[]
  liked: boolean
  bookmarked: boolean
  following: boolean
  profileImage: string
}