// src/store/pendingImageStore.ts
import { create } from 'zustand'

interface PendingImageStore {
  // typeCode -> 아직 서버에 보내지 않은 PNG 파일 (File은 저장할 수 없으므로 persist 하지 않음)
  files: Record<string, File>
  // 서버 연결을 제거하려는 typeCode
  removed: string[]
  // 새 파일 선택 (제거 예정 목록에서는 뺌)
  setFile: (typeCode: string, file: File) => void
  // 이미지 제거 (선택해 둔 파일이 있으면 버리고, 제거 예정으로 표시)
  markRemoved: (typeCode: string) => void
  // 저장 성공 또는 다른 테마를 불러올 때 초기화
  clear: () => void
}

export const usePendingImageStore = create<PendingImageStore>()((set) => ({
  files: {},
  removed: [],
  setFile: (typeCode, file) =>
    set((state) => ({
      files: { ...state.files, [typeCode]: file },
      removed: state.removed.filter((code) => code !== typeCode),
    })),
  markRemoved: (typeCode) =>
    set((state) => {
      const { [typeCode]: _discarded, ...files } = state.files
      return { files, removed: state.removed.includes(typeCode) ? state.removed : [...state.removed, typeCode] }
    }),
  clear: () => set({ files: {}, removed: [] }),
}))