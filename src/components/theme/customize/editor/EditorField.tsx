// src/components/theme/customize/editor/EditorField.tsx
import type { ReactNode } from "react";

interface EditorFieldProps {
  label: string;
  hint?: boolean;
  children: ReactNode;
}

// 라벨이 붙은 에디터 입력 항목 컴포넌트 (hint: 작은 보조 라벨)
export default function EditorField({ label, hint = false, children }: EditorFieldProps) {
  return (
    <div>
      <span className={`mb-1.5 block ${hint ? "text-xs text-field-hint" : "text-sm text-field-label"}`}>
        {label}
      </span>
      {children}
    </div>
  );
}
