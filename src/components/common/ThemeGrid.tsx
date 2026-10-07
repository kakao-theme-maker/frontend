// src/components/common/ThemeGrid.tsx
import type { ReactNode } from "react";

interface ThemeGridProps {
  children: ReactNode;
  columns?: "default" | "select";
  className?: string;
}

const COLUMN_STYLES = {
  default: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-6",
  select: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
} as const;

// 테마 카드를 반응형 그리드로 배치하는 컴포넌트
export default function ThemeGrid({ children, columns = "default", className = "" }: ThemeGridProps) {
  return (
    <div className={`grid gap-3 sm:gap-4 ${COLUMN_STYLES[columns]} ${className}`}>
      {children}
    </div>
  );
}
