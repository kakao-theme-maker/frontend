// src/components/common/Card.tsx
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  size?: "md" | "sm";
  className?: string;
}

const SIZE_STYLES = {
  md: "rounded-3xl p-6 sm:p-8",
  sm: "rounded-xl p-4",
} as const;

// 흰 배경 카드 래퍼 컴포넌트 (md: 페이지 섹션, sm: 에디터 패널)
export default function Card({ children, size = "md", className = "" }: CardProps) {
  return (
    <div className={`bg-white ${SIZE_STYLES[size]} ${className}`}>
      {children}
    </div>
  );
}
