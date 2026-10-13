// src/components/manage/ManageTabs.tsx
interface ManageTabsProps<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
}

// 테마관리 상단 탭 (내 테마 / 내가 좋아요한 테마 / 내 게시글)
export default function ManageTabs<T extends string>({ tabs, active, onChange }: ManageTabsProps<T>) {
  return (
    <div role="tablist" className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`whitespace-nowrap rounded-t-2xl px-4 py-2.5 text-sm font-semibold transition-colors sm:px-7 sm:py-3 sm:text-base ${isActive
                ? "border-2 border-b-0 border-primary-soft-hover bg-white text-primary"
                : "bg-primary-soft text-muted hover:bg-primary-soft-hover"
              }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}