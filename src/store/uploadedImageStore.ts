// src/store/uploadedImageStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UploadedImageStore {
  // 이미지 URL -> designComponentId (업로드한 이미지와 서버에서 받은 이미지 모두)
  ids: Record<string, number>
  register: (url: string, designComponentId: number) => void
  registerMany: (entries: Record<string, number>) => void
}

// 이미지가 어떤 designComponentId인지 기억 (테마 저장 시 이미지 정보로 사용)
export const useUploadedImageStore = create<UploadedImageStore>()(
  persist(
    (set) => ({
      ids: {},
      // 업로드 결과 등록
      register: (url, designComponentId) =>
        set((state) => ({ ids: { ...state.ids, [url]: designComponentId } })),
      // 서버에서 불러온 이미지 여러 개를 한 번에 등록
      registerMany: (entries) => set((state) => ({ ids: { ...state.ids, ...entries } })),
    }),
    { name: 'komentum-uploaded-images' },
  ),
)