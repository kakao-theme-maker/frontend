import type { TabKey } from "@/types/customize";
import { SCREEN_MAP } from "@/config/customizeTabs";

interface ThemePreviewProps {
  activeTab: TabKey;
}

export default function ThemePreview({ activeTab }: ThemePreviewProps) {
  const ActiveScreen = SCREEN_MAP[activeTab];

  return (
    <div className="flex justify-center">
      <div
        className="relative w-[min(90vw,330px)] aspect-390/700 origin-top
        rounded-3xl border border-gray-300
          text-xs overflow-hidden mx-auto"
      >
        <ActiveScreen />
      </div>
    </div>
  );
}