import type { TabKey } from "@/types/customize";
import { TABS, EDITOR_MAP } from "@/config/customizeTabs";

interface CustomizeTabsProps {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}

export default function CustomizeTabs({ activeTab, onChangeTab }: CustomizeTabsProps) {
  const ActiveEditor = EDITOR_MAP[activeTab];

  return (
    <div className="flex-1">
      <div className="flex gap-2 overflow-x-auto border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChangeTab(tab.key)}
            className={`shrink-0 whitespace-nowrap px-3 py-2 text-sm ${activeTab === tab.key
              ? "border-b-2 border-primary font-semibold text-primary"
              : "text-gray-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <ActiveEditor />
      </div>
    </div>
  );
}