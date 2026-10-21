// src/components/common/Field.tsx
import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import Input from "@/components/common/Input";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  // 라벨 오른쪽에 둘 보조 요소 (예: 비밀번호 찾기 링크)
  action?: ReactNode;
  // 입력창에 테두리를 표시할지 여부 (인증 폼처럼 배경과 구분이 필요할 때)
  bordered?: boolean;
}

// 라벨, 보조 요소, 에러 메시지가 붙은 입력 필드 컴포넌트
export default function Field({
  label,
  error,
  action,
  bordered = false,
  className = "",
  ...props
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-bold text-heading sm:text-base">
          {label}
        </label>
        {action}
      </div>

      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-11 rounded-[10px] bg-app-bg text-sm placeholder:text-field-hint sm:h-12 sm:text-base ${bordered ? "border border-slate-200" : ""
          } ${error ? "ring-2 ring-danger" : "focus-visible:ring-2 focus-visible:ring-primary/40"
          } ${className}`}
        {...props}
      />

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
