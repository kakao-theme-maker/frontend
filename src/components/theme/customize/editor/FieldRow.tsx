// src/components/theme/customize/editor/FieldRow.tsx
import type { ReactNode } from "react";

interface FieldRowProps {
  children: ReactNode;
  className?: string;
}

// 설정 항목을 가로로 나열(줄바꿈 허용)하는 컴포넌트
export default function FieldRow({ children, className = "" }: FieldRowProps) {
  return <div className={`flex flex-wrap items-start gap-4 ${className}`}>{children}</div>;
}
