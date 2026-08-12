import ChatScreenPreview from "./screen/ChatScreenPreview";
import ChatListScreenPreview from "./screen/ChatListScreenPreview";
import FriendsScreenPreview from "./screen/FriendsScreenPreview";
import HeaderScreenPreview from "./screen/HeaderScreenPreview";
import LayoutScreenPreview from "./screen/LayoutScreenPreview";
import PasscodeScreenPreview from "./screen/PasscodeScreenPreview";
import NotificationScreenPreview from "./screen/NotificationScreenPreview";

import type { TabKey } from "./CustomizeTabs";

const SCREEN_MAP: Record<TabKey, React.ComponentType> = {
  chat: ChatScreenPreview,
  chatList: ChatListScreenPreview,
  friends: FriendsScreenPreview,
  header: HeaderScreenPreview,
  layout: LayoutScreenPreview,
  passcode: PasscodeScreenPreview,
  notification: NotificationScreenPreview,
};

interface ThemePreviewProps {
  activeTab: TabKey;
}

export default function ThemePreview({ activeTab }: ThemePreviewProps) {
  const ActiveScreen = SCREEN_MAP[activeTab] ?? ChatScreenPreview;

  return (
    <div className="flex justify-center">
      <div
        className="relative w-[330px] aspect-[390/700] origin-top
          border border-gray-300 rounded-2xl p-1 text-xs overflow-hidden mx-auto"
      >
        <ActiveScreen />
      </div>
    </div>
  );
}