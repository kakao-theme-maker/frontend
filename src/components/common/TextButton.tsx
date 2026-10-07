// src/components/common/TextButton.tsx
import type { ButtonHTMLAttributes } from "react";

// 테두리 없는 텍스트 형태의 버튼 컴포넌트
export default function TextButton({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`hover:text-slate-600 ${className}`}
      {...props}
    />
  );
}
