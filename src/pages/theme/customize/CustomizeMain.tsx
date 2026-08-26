// src/pages/theme/customize/CustomizeMain.tsx
import { useState } from "react";
import Button from "@/components/common/Button";
import ThemeBasicSettings from "@/components/theme/customize/ThemeBasicSettings";
import ThemePreview from "@/components/theme/customize/ThemePreview";
import PreviewFrame from "@/components/theme/customize/PreviewFrame";
import type { TabKey } from "@/types/customize";
import CustomizeTabs from "@/components/theme/customize/CustomizeTabs";
import { TABS, EDITOR_MAP, SCREEN_MAP } from "@/config/customizeTabs";
import BottomSheet from "@/components/bottomsheet/BottomSheet";

export default function CustomizeMain() {
  const [activeTab, setActiveTab] = useState<TabKey>("chat");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [basicSheetOpen, setBasicSheetOpen] = useState(false);

  const ActiveEditor = EDITOR_MAP[activeTab];
  const activeLabel = TABS.find((tab) => tab.key === activeTab)?.label ?? "";

  const handleSelectTabMobile = (tab: TabKey) => {
    setActiveTab(tab);
    setSheetOpen(true);
  };

  return (
    <div className="py-6 px-4 sm:py-8 sm:px-6 lg:px-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">새 테마 만들기 - 간편모드</h1>
        <div className="sm:ml-auto flex gap-2">
          <Button>임시저장</Button>
          <Button>다운로드</Button>
        </div>
      </div>

      {/* 기본설정: 여러 화면에 공통 적용되는 값이라 탭이 아닌 상시 접근 영역으로 분리 */}
      <div className="mt-6 hidden lg:block">
        <ThemeBasicSettings />
      </div>
      <div className="mt-6 lg:hidden">
        <button
          onClick={() => setBasicSheetOpen(true)}
          className="w-full rounded-xl border border-dashed border-[#aab6d8] bg-[#E4EBFE] px-4 py-3 text-left text-sm font-semibold text-[#5B6C9B]"
        >
          기본설정 (테마 색상·이미지) 수정하기
        </button>
      </div>

      {/* 데스크탑(lg 이상): 프리뷰 + 화면별 탭 에디터 좌우 배치 */}
      <div className="hidden lg:flex gap-8 mt-6">
        <div className="w-[320px] shrink-0">
          <ThemePreview activeTab={activeTab} />
        </div>
        <CustomizeTabs activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>

      {/* 모바일/태블릿(lg 미만): 프리뷰가 메인, 화면별 탭 선택 시 바텀시트로 편집 */}
      <div className="lg:hidden mt-6">
        <ThemePreview activeTab={activeTab} />

        <div className="mt-4 flex gap-2 overflow-x-auto border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleSelectTabMobile(tab.key)}
              className={`shrink-0 whitespace-nowrap px-3 py-2 text-sm ${activeTab === tab.key
                ? "border-b-2 border-primary font-semibold text-primary"
                : "text-gray-500"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title={activeLabel}>
          <ActiveEditor />
        </BottomSheet>

        {/* 기본설정 바텀시트 - 프리뷰 화면 전환 없이 현재 화면 위에 색상/이미지만 실시간 반영 */}
        <BottomSheet open={basicSheetOpen} onClose={() => setBasicSheetOpen(false)} title="기본설정">
          <ThemeBasicSettings />
        </BottomSheet>
      </div>


      {/* 전체 화면 한눈에 보기: 모바일/데스크탑 공통, 페이지 최하단 */}
      <div className="mt-10">
        <h2 className="mb-4 text-sm font-semibold text-gray-700 sm:text-base">
          전체 화면 미리보기
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {TABS.map((tab) => {
            const ScreenPreview = SCREEN_MAP[tab.key];

            return (
              <div
                key={tab.key}
                className="min-w-0  bg-white p-3"
              >
                <h3 className="mb-2 text-xs font-semibold truncate">{tab.label}</h3>
                <PreviewFrame Screen={ScreenPreview} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}