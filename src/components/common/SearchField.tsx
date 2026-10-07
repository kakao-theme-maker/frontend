// src/components/common/SearchField.tsx
import { Search } from "lucide-react";
import Input from "@/components/common/Input";

type SearchFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

// 오른쪽에 검색 아이콘이 있는 둥근 검색 입력 컴포넌트
export default function SearchField({ className = "", ...props }: SearchFieldProps) {
  return (
    <div className={`flex w-full items-center rounded-full border border-slate-300 px-4 ${className}`}>
      <Input type="search" variant="bare" className="flex-1" {...props} />
      <Search size={20} className="pointer-events-none text-primary" />
    </div>
  );
}
