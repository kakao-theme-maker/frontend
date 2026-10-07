// src/components/common/Pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

// 이전/다음 버튼과 페이지 번호를 보여주는 페이지네이션 컴포넌트
export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3 text-sm text-slate-400">
      <button
        type="button"
        aria-label="이전 페이지"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onChange(num)}
          className={
            num === page
              ? "font-semibold text-primary underline underline-offset-4"
              : "hover:text-slate-600"
          }
        >
          {num}
        </button>
      ))}

      <button
        type="button"
        aria-label="다음 페이지"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
