// src/components/theme/customize/preview/PreviewHeader.tsx
import { useThemeStore } from "@/store/customizeStore"
import { MessageCirclePlusIcon, Search, Settings } from 'lucide-react'

// 헤더 프리뷰 컴포넌트
export default function PreviewHeader() {

  const common = useThemeStore(
    (state) => state.theme.common
  )

  return (
    <header className="flex gap-2 items-center p-4 pb-1 rounded-t-2xl"
      style={{
        color: common.mainTextColor,
        backgroundColor: common.mainBGColor
      }}>
      <span className='text-lg font-semibold'>채팅</span>
      <div className="ml-auto flex gap-3">
        <Search size={16} />
        <MessageCirclePlusIcon size={16} />
        <Settings size={16} />
      </div>
    </header>
  )
}
