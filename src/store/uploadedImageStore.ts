// src/store/uploadedImageStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UploadedImageStore {
  // 업로드한 이미지 URL -> designComponentId
  ids: Record<string, number>
  register: (url: string, designComponentId: number) => void
}

// 업로드한 이미지가 어떤 designComponentId인지 기억 (테마 저장 시 이미지 정보로 사용)
export const useUploadedImageStore = create<UploadedImageStore>()(
  persist(
    (set) => ({
      ids: {},
      // 업로드 결과 등록
      register: (url, designComponentId) =>
        set((state) => ({ ids: { ...state.ids, [url]: designComponentId } })),
    }),
    { name: 'komentum-uploaded-images' },
  ),
)
