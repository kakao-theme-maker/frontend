// src/components/common/PageTitle.tsx
import type { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

// 페이지 최상단 제목(h1) 컴포넌트
export default function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1 className={`text-2xl font-bold sm:text-3xl ${className}`}>
      {children}
    </h1>
  );
}
