// src/pages/theme/customize/CustomizeMain.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Platform } from "@/api/types";
import { useDownloadTheme, useSaveTheme, useTheme } from "@/hooks/useThemes";
import { useThemeStore } from "@/store/customizeStore";
import { toColorEntries } from "@/utils/themeRequest";
import Button from "@/components/common/Button";
import ThemeBasicSettings from "@/components/theme/customize/ThemeBasicSettings";
import ThemePreview from "@/components/theme/customize/ThemePreview";
import PreviewFrame from "@/components/theme/customize/PreviewFrame";
import type { TabKey } from "@/types/customize";
import CustomizeTabs from "@/components/theme/customize/CustomizeTabs";
import TabStrip from "@/components/theme/customize/TabStrip";
import { TABS, EDITOR_MAP, SCREEN_MAP } from "@/config/customizeTabs";
import BottomSheet from "@/components/bottomsheet/BottomSheet";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import SectionTitle from "@/components/common/SectionTitle";
import useMediaQuery from "@/hooks/useMediaQuery";

// 테마 만들기 간편모드 메인 페이지
export default function CustomizeMain() {
  const [activeTab, setActiveTab] = useState<TabKey>("chat");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [basicSheetOpen, setBasicSheetOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const navigate = useNavigate();
  const { id } = useParams();
  // "new" 같은 숫자가 아닌 id면 아직 저장되지 않은 새 테마
  const themeId = id !== undefined && !Number.isNaN(Number(id)) ? Number(id) : undefined;
  const themeName = useThemeStore((state) => state.themeName);
  const applyServerTheme = useThemeStore((state) => state.applyServerTheme);
  const { data: loadedTheme } = useTheme(themeId);
  const saveTheme = useSaveTheme();
  const downloadTheme = useDownloadTheme();
  const [platform, setPlatform] = useState<Platform>("ANDROID");
  const [message, setMessage] = useState<string | null>(null);
  const isBusy = saveTheme.isPending || downloadTheme.isPending;

  // 저장된 테마를 열면 서버의 이름과 색상을 에디터에 반영
  useEffect(() => {
    if (loadedTheme) applyServerTheme(loadedTheme.themeName, toColorEntries(loadedTheme.styles));
  }, [loadedTheme, applyServerTheme]);

  const ActiveEditor = EDITOR_MAP[activeTab];
  const activeLabel = TABS.find((tab) => tab.key === activeTab)?.label ?? "";

  // 모바일에서 탭 선택 시 바텀시트 열기
  const handleSelectTabMobile = (tab: TabKey) => {
    setActiveTab(tab);
    setSheetOpen(true);
  };

  // 테마 이름 확인 후 서버에 임시저장하고, 새 테마면 발급된 id 주소로 이동
  const save = async () => {
    const name = themeName.trim();
    if (name === "") {
      setMessage("테마 이름을 입력해주세요.");
      return null;
    }
    try {
      const savedId = await saveTheme.mutateAsync({ themeId, themeName: name });
      if (themeId === undefined) navigate(`/themes/${savedId}/customize`, { replace: true });
      return savedId;
    } catch {
      setMessage("테마 저장에 실패했어요. 다시 시도해 주세요.");
      return null;
    }
  };

  // 임시저장 버튼 핸들러
  const handleSave = async () => {
    setMessage(null);
    if ((await save()) !== null) setMessage("임시저장했어요.");
  };

  // 저장 -> 빌드 -> 다운로드 순서로 진행
  const handleDownload = async () => {
    setMessage(null);
    const savedId = await save();
    if (savedId === null) return;
    try {
      const url = await downloadTheme.mutateAsync({ themeId: savedId, platform });
      window.location.assign(url);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "다운로드에 실패했어요.");
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center w-full">
        <PageTitle>새 테마 만들기 - 간편모드</PageTitle>
        <div className="sm:ml-auto flex items-center gap-2">
          {(["ANDROID", "IOS"] as const).map((p) => (
            <Button
              key={p}
              size="sm"
              variant={platform === p ? "solid" : "outline"}
              onClick={() => setPlatform(p)}
              disabled={isBusy}
            >
              {p === "ANDROID" ? "Android" : "iOS"}
            </Button>
          ))}
          <Button onClick={handleSave} disabled={isBusy}>
            {saveTheme.isPending && !downloadTheme.isPending ? "저장 중..." : "임시저장"}
          </Button>
          <Button onClick={handleDownload} disabled={isBusy}>
            {downloadTheme.isPending ? "빌드 중..." : "다운로드"}
          </Button>
        </div>
      </div>
      {message && <p className="mt-2 text-right text-sm text-slate-500">{message}</p>}

      <div className="mt-6">
        {isDesktop ? (
          <ThemeBasicSettings />
        ) : (
          <button
            type="button"
            onClick={() => setBasicSheetOpen(true)}
            className="w-full rounded-xl border border-dashed border-field-border bg-primary-soft px-4 py-3 text-left text-sm font-semibold text-field-label"
          >
            기본설정 (테마 색상·이미지) 수정하기
          </button>
        )}
      </div>

      {isDesktop ? (
        <div className="flex gap-8 mt-6">
          <div className="w-[320px] shrink-0">
            <ThemePreview activeTab={activeTab} />
          </div>
          <CustomizeTabs activeTab={activeTab} onChangeTab={setActiveTab} />
        </div>
      ) : (
        <div className="mt-6">
          <ThemePreview activeTab={activeTab} />

          <TabStrip activeTab={activeTab} onChange={handleSelectTabMobile} className="mt-4" />

          <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title={activeLabel}>
            <ActiveEditor />
          </BottomSheet>

          <BottomSheet open={basicSheetOpen} onClose={() => setBasicSheetOpen(false)} title="기본설정">
            <ThemeBasicSettings />
          </BottomSheet>
        </div>
      )}

      <div className="mt-10">
        <SectionTitle size="md" className="mb-4">
          전체 화면 미리보기
        </SectionTitle>
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
    </PageContainer>
  );
}
