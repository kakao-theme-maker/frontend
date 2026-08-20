import BubbleEditor from "./editor/BubbleEditor";
import ChatEditor from "./editor/ChatEditor";
import ChatListEditor from "./editor/ChatListEditor";
import FriendsEditor from "./editor/FriendsEditor";
import LayoutEditor from "./editor/LayoutEditor";
import NotificationEditor from "./editor/NotificationEditor";
import PasscodeEditor from "./editor/PasscodeEditor";

export const TABS = [
  { key: "passcode", label: "잠금화면" },
  { key: "bubble", label: "말풍선" },
  { key: "layout", label: "탭바" },
  { key: "friends", label: "친구" },
  { key: "chatList", label: "채팅목록" },
  { key: "chat", label: "채팅방" },
  { key: "notification", label: "알림" },
] as const;

export type TabKey = typeof TABS[number]["key"];

interface CustomizeTabsProps {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
}

export default function CustomizeTabs({ activeTab, onChangeTab }: CustomizeTabsProps) {
  return (
    <div className="flex-1">
      <div className="flex gap-2 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChangeTab(tab.key)}
            className={`px-3 py-2 text-sm ${activeTab === tab.key
              ? "border-b-2 border-blue-500 font-semibold text-blue-500"
              : "text-gray-500"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "chat" && <ChatEditor />}
        {activeTab === "chatList" && <ChatListEditor />}
        {activeTab === "friends" && <FriendsEditor />}
        {activeTab === "bubble" && <BubbleEditor />}
        {activeTab === "layout" && <LayoutEditor />}
        {activeTab === "passcode" && <PasscodeEditor />}
        {activeTab === "notification" && <NotificationEditor />}
      </div>
    </div>
  );
}