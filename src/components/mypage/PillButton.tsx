import type { ComponentProps } from "react";
import Button from "@/components/common/Button";

export default function PillButton({ className = "", ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      className={`w-full rounded-full! py-3! text-base sm:py-4! sm:text-lg lg:py-5! lg:text-2xl ${className}`}
      {...props}
    />
  );
}
