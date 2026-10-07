// src/components/common/Textarea.tsx
import { INPUT_DECOR_STYLES } from "./inputStyles";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// outline 스타일이 적용된 공통 textarea 컴포넌트
export default function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full resize-none px-4 py-3 outline-none ${INPUT_DECOR_STYLES.outline} ${className}`}
      {...props}
    />
  );
}
