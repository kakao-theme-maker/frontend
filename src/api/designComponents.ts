// src/api/designComponents.ts
import { api, buildFormData } from './client'
import type { DesignComponent } from './types'

// 이미지 업로드 (multipart: request + image) -> 디자인 컴포넌트 생성
export const createDesignComponent = (image: File, isPublic = false) =>
  api
    .post<DesignComponent>(
      '/api/design-components',
      buildFormData({ key: 'request', value: { isPublic } }, { key: 'image', value: image }),
    )
    .then((r) => r.data)
