import { useId, type InputHTMLAttributes } from "react";
import Input from "@/components/common/Input";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Field({ label, error, className = "", ...props }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-base font-bold text-[#2F3453] sm:text-lg lg:text-xl"
      >
        {label}
      </label>

      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`h-12 rounded-[10px] bg-app-bg sm:h-14 lg:h-15 lg:text-lg ${error ? "ring-2 ring-[#FF5B5B]" : "focus-visible:ring-2 focus-visible:ring-primary/40"
          } ${className}`}
        {...props}
      />

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-[#FF5B5B]">
          {error}
        </p>
      )}
    </div>
  );
}