// src/components/common/PageContainer.tsx
import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

// 모든 페이지 공통 여백 래퍼 컴포넌트
export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
