// src/components/theme/customize/preview/PreviewNav.tsx
import { TAB_ICON_COLUMNS } from "@/config/themeAssets";
import { useThemeStore } from "@/store/customizeStore";

interface INavPreviewProps {
  selectedTab: (typeof TAB_ICON_COLUMNS)[number]["key"];
}

// 하단 탭바 프리뷰 컴포넌트
export default function PreviewNav({ selectedTab }: INavPreviewProps) {
  const tabBar = useThemeStore((state) => state.theme.tabBar);

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div
        className="relative w-full h-14 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundColor: "white",
          backgroundImage: `url(${tabBar.bgImage})`,
        }}
      >
        <nav className="absolute inset-0 grid grid-cols-5 justify-items-center items-center text-center text-gray-900">
          {TAB_ICON_COLUMNS.map((tab) => (
            <img
              key={tab.key}
              src={selectedTab === tab.key ? tabBar[tab.selectedKey] : tabBar[tab.key]}
              className="w-7"
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
