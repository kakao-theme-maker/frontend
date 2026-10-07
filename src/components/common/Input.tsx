// src/components/common/Input.tsx
import { INPUT_DECOR_STYLES, type InputVariant } from "./inputStyles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

// 공통 input 컴포넌트 (plain / outline / dashed / bare)
export default function Input({
  variant = "plain",
  className = "",
  ...props
}: InputProps) {
  const padding = variant === "bare" ? "px-0 py-2" : "px-4 py-2";
  const width = /(^|\s)w-/.test(className) ? "" : "w-full";

  return (
    <input
      className={`${width} ${padding} outline-none ${INPUT_DECOR_STYLES[variant]} ${className}`}
      {...props}
    />
  );
}
