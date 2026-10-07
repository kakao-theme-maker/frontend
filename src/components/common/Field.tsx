// src/components/common/Field.tsx
import { useId, type InputHTMLAttributes } from "react";
import Input from "@/components/common/Input";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// 라벨과 에러 메시지가 붙은 입력 필드 컴포넌트
export default function Field({ label, error, className = "", ...props }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-heading sm:text-base"
      >
        {label}
      </label>

      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-11 rounded-[10px] bg-app-bg text-sm sm:h-12 sm:text-base ${error ? "ring-2 ring-danger" : "focus-visible:ring-2 focus-visible:ring-primary/40"
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