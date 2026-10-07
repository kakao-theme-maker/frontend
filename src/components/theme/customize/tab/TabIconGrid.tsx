// src/components/theme/customize/tab/TabIconGrid.tsx
import Card from "@/components/common/Card";
import { TAB_ICON_COLUMNS } from "@/config/themeAssets";
import { useThemeStore } from "@/store/customizeStore";
import StateImageGrid from "../editor/StateImageGrid";

// 탭별 일반/선택 아이콘 이미지 설정 그리드 컴포넌트
export default function TabIconGrid() {
  const tabBar = useThemeStore((state) => state.theme.tabBar);
  const setTabBar = useThemeStore((state) => state.setTabBar);

  return (
    <Card size="sm">
      <StateImageGrid
        columns={TAB_ICON_COLUMNS}
        values={tabBar}
        onChange={(key, url) => setTabBar({ [key]: url })}
        getAlt={(label, selected) => `${label} ${selected ? "선택" : "기본"} 아이콘`}
      />
    </Card>
  );
}
