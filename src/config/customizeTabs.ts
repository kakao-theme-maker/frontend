// src/config/customizeTabs.ts
import type { TabKey } from "@/types/customize";

import BubbleEditor from "@/components/theme/customize/editor/BubbleEditor";
import ChatEditor from "@/components/theme/customize/editor/ChatEditor";
import ChatListEditor from "@/components/theme/customize/editor/ChatListEditor";
import FriendsEditor from "@/components/theme/customize/editor/FriendsEditor";
import LayoutEditor from "@/components/theme/customize/editor/LayoutEditor";
import NotificationEditor from "@/components/theme/customize/editor/NotificationEditor";
import PasscodeEditor from "@/components/theme/customize/editor/PasscodeEditor";

import ChatScreenPreview from "@/components/theme/customize/screen/ChatScreenPreview";
import ChatListScreenPreview from "@/components/theme/customize/screen/ChatListScreenPreview";
import FriendsScreenPreview from "@/components/theme/customize/screen/FriendsScreenPreview";
import LayoutScreenPreview from "@/components/theme/customize/screen/LayoutScreenPreview";
import PasscodeScreenPreview from "@/components/theme/customize/screen/PasscodeScreenPreview";
import NotificationScreenPreview from "@/components/theme/customize/screen/NotificationScreenPreview";

export const TABS: { key: TabKey; label: string }[] = [
  { key: "passcode", label: "잠금화면" },
  { key: "bubble", label: "말풍선" },
  { key: "layout", label: "탭바" },
  { key: "friends", label: "친구" },
  { key: "chatList", label: "채팅목록" },
  { key: "chat", label: "채팅방" },
  { key: "notification", label: "알림" },
];

export const EDITOR_MAP: Record<TabKey, React.ComponentType> = {
  passcode: PasscodeEditor,
  bubble: BubbleEditor,
  layout: LayoutEditor,
  friends: FriendsEditor,
  chatList: ChatListEditor,
  chat: ChatEditor,
  notification: NotificationEditor,
};

export const SCREEN_MAP: Record<TabKey, React.ComponentType> = {
  passcode: PasscodeScreenPreview,
  bubble: ChatScreenPreview,
  layout: LayoutScreenPreview,
  friends: FriendsScreenPreview,
  chatList: ChatListScreenPreview,
  chat: ChatScreenPreview,
  notification: NotificationScreenPreview,
};