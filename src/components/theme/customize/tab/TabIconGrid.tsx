import ImageUpload from "@/components/common/ImageUpload";
import { useThemeStore } from "@/store/customizeStore";

const TABS = [
  { key: "friends", selectedKey: "friendsSelected", label: "친구탭" },
  { key: "chats", selectedKey: "chatsSelected", label: "채팅탭" },
  { key: "now", selectedKey: "nowSelected", label: "지금탭" },
  { key: "shopping", selectedKey: "shoppingSelected", label: "쇼핑탭" },
  { key: "more", selectedKey: "moreSelected", label: "더보기탭" },
] as const;

export default function TabIconGrid() {
  const tabBar = useThemeStore((state) => state.theme.tabBar);
  const setTabBar = useThemeStore((state) => state.setTabBar);

  return (
    <div className="rounded-xl bg-white p-4">
      <div className="grid grid-cols-[56px_repeat(5,48px)] items-center gap-x-3 gap-y-3">
        {/* 헤더 */}
        <div />
        {TABS.map((tab) => (
          <span
            key={tab.key}
            className="text-center text-xs font-medium text-slate-600"
          >
            {tab.label}
          </span>
        ))}

        {/* 안눌림 */}
        <span>안눌림</span>
        {TABS.map((tab) => (
          <ImageUpload
            size={48}
            value={tabBar[tab.key]}
            onChange={(url) => setTabBar({ [tab.key]: url })}
            onRemove={() => setTabBar({ [tab.key]: "" })}
            alt={`${tab.label} 기본 아이콘`}
          />
        ))}

        {/* 눌림 */}
        <span>눌림</span>
        {TABS.map((tab) => (
          <ImageUpload
            key={tab.selectedKey}
            size={48}

            value={tabBar[tab.selectedKey]}
            onChange={(url) => setTabBar({ [tab.selectedKey]: url })}
            onRemove={() => setTabBar({ [tab.selectedKey]: "" })}
            alt={`${tab.label} 선택 아이콘`}
          />
        ))}
      </div>
    </div>
  );
}