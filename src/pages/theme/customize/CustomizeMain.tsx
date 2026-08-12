import { useState } from "react";
import Button from "@/components/common/Button";
import ThemeBasicSettings from "@/components/theme/customize/ThemeBasicSettings";
import ThemePreview from "@/components/theme/customize/ThemePreview";
import CustomizeTabs, { type TabKey } from "@/components/theme/customize/CustomizeTabs";

export default function CustomizeMain() {
  const [activeTab, setActiveTab] = useState<TabKey>("chat");

  return (
    <div className="py-8 px-20">
      <div className="flex w-full">
        <h1>새 테마 만들기 - 간편모드</h1>
        <div className="ml-auto">
          <Button>임시저장</Button>
          <Button>다운로드</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {/* 테마 기본 설정 */}
        <ThemeBasicSettings />

        {/* 테마 커스텀 */}
        <div className="bg-white rounded-xl p-4">
          <h2>테마 커스텀</h2>

          <div className="flex gap-8 mt-4">
            <ThemePreview activeTab={activeTab} />
            <CustomizeTabs activeTab={activeTab} onChangeTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
}