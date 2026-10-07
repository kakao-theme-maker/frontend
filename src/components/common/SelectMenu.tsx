// src/components/common/SelectMenu.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/common/Button";

interface SelectMenuProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  variant?: "outline" | "neutral";
  menuClassName?: string;
  className?: string;
}

// 현재 값을 보여주고 클릭하면 옵션 목록이 열리는 드롭다운 컴포넌트
export default function SelectMenu<T extends string>({
  value,
  options,
  onChange,
  variant = "outline",
  menuClassName = "left-0 w-44",
  className = "",
}: SelectMenuProps<T>) {
  const [open, setOpen] = useState(false);

  // 옵션을 선택하고 메뉴 닫기
  const handleSelect = (option: T) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        type="button"
        variant={variant}
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5"
      >
        {value}
        <ChevronDown size={16} />
      </Button>

      {open && (
        <div className={`absolute top-full z-10 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg ${menuClassName}`}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
