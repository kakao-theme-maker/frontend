// src/components/common/Checkbox.tsx
import type { InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

// 라벨이 붙은 체크박스 컴포넌트
export default function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 text-sm text-muted sm:text-base ${className}`}>
      <input
        type="checkbox"
        className="h-4 w-4 cursor-pointer rounded border-field-border accent-primary"
        {...props}
      />
      {label}
    </label>
  );
}
