// src/components/theme/customize/preview/PreviewHeader.tsx
import { MessageCirclePlusIcon, Search, Settings } from "lucide-react";
import { useThemeStore } from "@/store/customizeStore";

interface PreviewHeaderProps {
  className?: string;
  // true면 헤더 배경색을 칠하지 않고 투명하게 둠
  transparent?: boolean;
}

// 채팅 화면 상단 헤더 프리뷰 컴포넌트 (채팅방/채팅목록 화면에서 공통 사용)
export default function PreviewHeader({
  className = "p-4 pb-1 rounded-t-2xl",
  transparent = false,
}: PreviewHeaderProps) {
  const common = useThemeStore((state) => state.theme.common);

  return (
    <header
      className={`flex gap-2 items-center ${className}`}
      style={{
        color: common.mainTextColor,
        backgroundColor: transparent ? undefined : common.mainBGColor,
      }}
    >
      <span className="text-lg font-semibold">채팅</span>
      <div className="ml-auto flex gap-3">
        <Search size={16} />
        <MessageCirclePlusIcon size={16} />
        <Settings size={16} />
      </div>
    </header>
  );
}
