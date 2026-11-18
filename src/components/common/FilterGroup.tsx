// src/components/common/FilterGroup.tsx
import FilterChip from "./FilterChip";

interface FilterGroupProps {
  title: string;
  items: string[];
  activeItem?: string | null;
  onSelect?: (item: string) => void;
}

// 제목과 필터 칩 목록을 묶은 그룹 컴포넌트
export default function FilterGroup({
  title,
  items,
  activeItem,
  onSelect,
}: FilterGroupProps) {
  return (
    <div className="flex items-center gap-4 py-3">
      <span className="w-28 shrink-0 text-sm font-semibold text-slate-800">
        {title}
      </span>
      <div className="h-4 w-px bg-slate-300" />
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <FilterChip
            key={item}
            label={item}
            active={item === activeItem}
            onClick={() => onSelect?.(item)}
          />
        ))}
      </div>
    </div>
  );
}