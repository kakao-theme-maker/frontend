// src/components/form/FormField.tsx
import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

// 라벨이 붙은 폼 입력 항목 컴포넌트
export default function FormField({ label, children, className = "" }: FormFieldProps) {
  return (
    <div className={className || undefined}>
      <label className="text-sm font-semibold text-slate-800">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
