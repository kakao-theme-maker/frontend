// src/components/theme/customize/editor/EditorSection.tsx
import type { ReactNode } from "react";

interface EditorSectionProps {
  title: string;
  children: ReactNode;
}

// 제목이 붙은 에디터 설정 섹션 컴포넌트
export default function EditorSection({ title, children }: EditorSectionProps) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}
