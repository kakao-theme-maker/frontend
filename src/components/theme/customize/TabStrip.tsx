// src/components/theme/customize/TabStrip.tsx
import { TABS } from "@/config/customizeTabs";
import type { TabKey } from "@/types/customize";

interface TabStripProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
  className?: string;
}

// 화면별 탭 버튼 목록(가로 스크롤) 컴포넌트
export default function TabStrip({ activeTab, onChange, className = "" }: TabStripProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto border-b border-slate-200 ${className}`}>
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`shrink-0 whitespace-nowrap px-3 py-2 text-sm ${activeTab === tab.key
            ? "border-b-2 border-primary font-semibold text-primary"
            : "text-slate-500"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
