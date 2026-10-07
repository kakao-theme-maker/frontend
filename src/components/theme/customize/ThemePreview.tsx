// src/components/theme/customize/ThemePreview.tsx
import type { TabKey } from "@/types/customize";
import { SCREEN_MAP } from "@/config/customizeTabs";

interface ThemePreviewProps {
  activeTab: TabKey;
}

// 선택된 탭의 화면 프리뷰 컴포넌트
export default function ThemePreview({ activeTab }: ThemePreviewProps) {
  const ActiveScreen = SCREEN_MAP[activeTab];

  return (
    <div className="flex justify-center">
      <div
        className="relative w-[min(90vw,330px)] aspect-390/700 origin-top
        rounded-3xl border border-slate-300
          text-xs overflow-hidden mx-auto"
      >
        <ActiveScreen />
      </div>
    </div>
  );
}