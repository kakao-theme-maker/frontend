// src/components/common/SectionTitle.tsx
import type { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}

const SIZE_STYLES = {
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl lg:text-2xl",
} as const;

// 페이지 내 섹션 제목(h2) 컴포넌트
export default function SectionTitle({ children, size = "lg", className = "" }: SectionTitleProps) {
  return (
    <h2 className={`font-bold ${SIZE_STYLES[size]} ${className}`}>
      {children}
    </h2>
  );
}
