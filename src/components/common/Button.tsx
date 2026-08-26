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
      className={`rounded-md px-5 py-2 border border-primary bg-primary text-white 
    transition-colors hover:bg-blue-800  hover:border-blue-800 
    focus-visible:ring-2 focus-visible:ring-primary 
    disabled:opacity-50 disabled:pointer-events-none
    ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}