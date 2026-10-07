// src/api/types.ts
export type Platform = 'ANDROID' | 'IOS'

export interface PageParams {
  page?: number
  size?: number
  sort?: string[]
}

export interface LocalLoginRequest { email: string; password: string }
export interface UserAuthResponse { accessToken: string; refreshToken: string }

export interface UserResponse {
  name: string
  followers: number
  following: number
  uploads: number
  gender: 'male' | 'female'
  birth: string
  user_email: string
  profile_image: string
  profile_image_name: string
  public_user_id: string
  created_at: string
}

// PATCH /api/users/me/name
export interface UpdateNameRequest { name: string }
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
export interface ThemeBoardPreview {
  title: string
  prefers: number
  post_id: number
  theme_component_id: number
  preview_image_url: string
  user_email: string
  created_at: string
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

export interface DesignBoardListParams extends BoardListParams {
  typeCode?: string
}
export interface DesignBoardCreate {
  title: string
  content: string
  designComponentId: number
  public_flag?: boolean
  post_tags?: TagCreate[]
}
export interface DesignBoardPreview {
  title: string
  prefers: number
  post_id: number
  design_component_id: number
  preview_image_url: string
  user_email: string
  created_at: string
}
export interface DesignBoardDetail {
  title: string
  content: string
  prefers: number
  comments: number
  tags: TagResponse[]
  liked: boolean
  bookmarked: boolean
  post_id: number
  design_component_id: number
  user_email: string
  user_name: string
  created_at: string
  preview_image_url: string[]
  profile_image: string
  following?: boolean
}
