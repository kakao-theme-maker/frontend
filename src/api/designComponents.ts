// src/api/designComponents.ts
import { api, buildFormData } from './client'
import type { ComponentType, DesignComponent } from './types'

// 이미지 업로드 (multipart: request + image) -> 디자인 컴포넌트 생성
// componentTypeIds: 이 이미지가 쓰일 이미지 종류 ID (1개 이상 필수)
export const createDesignComponent = (image: File, componentTypeIds: number[], isPublic = false) =>
  api
    .post<DesignComponent>(
      '/api/design-components',
      buildFormData({ key: 'request', value: { isPublic, componentTypeIds } }, { key: 'image', value: image }),
    )
    .then((r) => r.data)

// 이미지 종류 전체 조회 (typeCode -> componentTypeId 변환용)
export const getComponentTypes = () =>
  api.get<ComponentType[]>('/api/component-types').then((r) => r.data)