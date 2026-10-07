// src/components/common/ThemeCardBase.tsx
import type { ReactNode } from "react";

interface ThemeCardBaseProps {
  image: string;
  title: string;
  subtitle?: string;
  titleSize?: "md" | "lg";
  selected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const TITLE_STYLES = {
  md: "text-xs sm:text-sm",
  lg: "text-sm sm:text-base",
} as const;

const SHELL_STYLES = "w-full min-w-0 overflow-hidden rounded-2xl border bg-white";

// 썸네일, 제목, 부가 정보를 가진 테마 카드 공통 레이아웃 컴포넌트
export default function ThemeCardBase({
  image,
  title,
  subtitle,
  titleSize = "lg",
  selected = false,
  onClick,
  children,
}: ThemeCardBaseProps) {
  const content = (
    <>
      <img src={image} alt="" className="aspect-square w-full object-cover" />

      <div className="flex flex-col p-3 sm:p-3.5">
        <span className={`truncate font-bold ${TITLE_STYLES[titleSize]}`}>{title}</span>

        {subtitle && (
          <span className="text-xs text-slate-400 sm:text-sm">{subtitle}</span>
        )}

        {children}
      </div>
    </>
  );

  if (!onClick) {
    return <div className={`${SHELL_STYLES} border-slate-300`}>{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${SHELL_STYLES} text-left transition-colors ${selected
        ? "border-primary ring-2 ring-primary/30"
        : "border-slate-300 hover:border-slate-400"
        }`}
    >
      {content}
    </button>
  );
}
