import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`rounded-md px-5 py-2 border border-rose-500 text-rose-500 
    transition-colors hover:bg-rose-500 hover:text-white 
    focus-visible:ring-2 focus-visible:ring-rose-500 
    disabled:opacity-50 disabled:pointer-events-none
    ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}