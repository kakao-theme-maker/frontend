// src/components/theme/customize/CustomizeTabs.tsx
import type { TabKey } from "@/types/customize";
import { EDITOR_MAP } from "@/config/customizeTabs";
import TabStrip from "./TabStrip";

interface CustomizeTabsProps {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}

// 화면별 탭과 선택된 탭의 에디터를 보여주는 컴포넌트
export default function CustomizeTabs({ activeTab, onChangeTab }: CustomizeTabsProps) {
  const ActiveEditor = EDITOR_MAP[activeTab];

  return (
    <div className="flex-1">
      <TabStrip activeTab={activeTab} onChange={onChangeTab} />

      <div className="mt-4">
        <ActiveEditor />
      </div>
    </div>
  );
}
