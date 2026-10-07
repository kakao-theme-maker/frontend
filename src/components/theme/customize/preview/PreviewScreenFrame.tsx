// src/components/theme/customize/preview/PreviewScreenFrame.tsx
import type { ReactNode } from "react";
import { useThemeStore } from "@/store/customizeStore";

interface PreviewScreenFrameProps {
  children: ReactNode;
}

// 메인 배경색이 적용된 프리뷰 화면 공통 프레임 컴포넌트
export default function PreviewScreenFrame({ children }: PreviewScreenFrameProps) {
  const common = useThemeStore((state) => state.theme.common);

  return (
    <div className="relative w-full h-full rounded-2xl p-2" style={{ backgroundColor: common.mainBGColor }}>
      {children}
    </div>
  );
}
