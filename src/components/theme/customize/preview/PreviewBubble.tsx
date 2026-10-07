// src/components/theme/customize/preview/PreviewBubble.tsx
import type { ReactNode } from "react";
import { getBubbleStyle } from "@/utils/bubbleStyle";

interface PreviewBubbleProps {
  image: string;
  edgeInsets: string;
  children: ReactNode;
}

// 배경 이미지 슬라이스가 적용된 말풍선 프리뷰 컴포넌트
export default function PreviewBubble({ image, edgeInsets, children }: PreviewBubbleProps) {
  return (
    <div
      className="w-max h-7 flex items-center justify-center"
      style={getBubbleStyle(image, edgeInsets)}
    >
      <span>{children}</span>
    </div>
  );
}
