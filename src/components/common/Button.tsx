// src/components/common/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "solid" | "outline" | "neutral";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "md" | "lg" | "full";
}

const VARIANT_STYLES = {
  solid:
    "border border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary-soft",
  neutral:
    "border border-slate-300 bg-transparent text-slate-600 hover:bg-slate-50",
} as const;

const SIZE_STYLES = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2",
  lg: "px-6 py-2.5",
  xl: "w-full px-5 py-3 text-base",
} as const;

const ROUNDED_STYLES = {
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
} as const;

// 공통 버튼 컴포넌트 (variant / size / rounded 조합)
export default function Button({
  children,
  variant = "solid",
  size = "md",
  rounded = variant === "solid" ? "md" : "full",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
    disabled:pointer-events-none disabled:opacity-50
    ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${ROUNDED_STYLES[rounded]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
