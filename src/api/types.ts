// src/api/types.ts
export type Platform = 'ANDROID' | 'IOS'

export interface PageParams {
  page?: number
  size?: number
  sort?: string[]
}

export interface LocalLoginRequest { email: string; password: string }
export interface UserAuthResponse { accessToken: string; refreshToken: string }

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

// 댓글 (GET /api/posts/{postId}/comments) - 이 응답만 camelCase
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

// 디자인 컴포넌트(업로드한 이미지) 응답
export interface DesignComponent {
  design_component_id: number
  public_user_id: string
  image_url: string
  created_at: string
  updated_at: string
  is_public: boolean
}

export interface ThemeStyleRequest { colorStyleId: number; color?: string }
export interface ThemeImageRequest { designComponentId?: number; componentTypeId?: number }

export interface ThemeUpsertRequest {
  userEmail: string
  themeName: string
  versionName?: string
  isPublic?: boolean
  styles?: ThemeStyleRequest[]
  images?: ThemeImageRequest[]
}

export interface ThemeStyle {
  colorStyleId: number
  color: string
  opacity?: number
  platform?: Platform
}
export interface ThemeImage {
  designComponentId: number
  imageUrl?: string
  platform?: Platform
  [extra: string]: unknown
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

export type BuildId = string | number
export interface ThemeBuildCreateResponse { buildId: BuildId }
export type BuildStatus = 'success' | 'failed' | 'running'
export interface ThemeBuildStatus {
  status: BuildStatus
  downloadUrl?: string
}
export interface ThemeDownloadResponse {
  downloadUrl: string
}

export interface TagCreate { tag_name: string }
export interface TagResponse { tag_id: number; tag_name: string }

export interface BoardListParams extends PageParams {
  keyword?: string
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
export interface ThemeBoardDetail {
  title: string
  content: string
  prefers: number
  comments: number
  tags: TagResponse[]
  liked: boolean
  bookmarked: boolean
  post_id: number
  theme_component_id: number
  user_email: string
  user_name: string
  created_at: string
  preview_image_url: string[]
  profile_image: string
  following?: boolean
}