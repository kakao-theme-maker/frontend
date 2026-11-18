// src/components/auth/AuthField.tsx
import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import Input from "@/components/common/Input";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  action?: ReactNode;
}

// 라벨 오른쪽에 보조 링크(action)를 둘 수 있는 인증 폼 입력 필드 컴포넌트
export default function AuthField({ label, action, className = "", ...props }: AuthFieldProps) {
  const id = useId();

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
        className={`h-11 rounded-[10px] border border-slate-200 bg-app-bg text-sm placeholder:text-field-hint focus-visible:ring-2 focus-visible:ring-primary/40 sm:h-12 sm:text-base ${className}`}
        {...props}
      />
    </div>
  );
}
