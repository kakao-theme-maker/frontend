// src/config/customizeTabs.ts
import type { ComponentType } from "react";

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

interface TabDefinition {
  key: string;
  label: string;
  // 선택한 탭에서 보여줄 설정 에디터
  Editor: ComponentType;
  // 선택한 탭에서 보여줄 화면 미리보기
  Screen: ComponentType;
}

// 커스터마이징 탭 정의 (탭을 추가/수정할 때는 이 배열만 고치면 됨)
export const TABS = [
  { key: "passcode", label: "잠금화면", Editor: PasscodeEditor, Screen: PasscodeScreenPreview },
  { key: "bubble", label: "말풍선", Editor: BubbleEditor, Screen: ChatScreenPreview },
  { key: "layout", label: "탭바", Editor: LayoutEditor, Screen: LayoutScreenPreview },
  { key: "friends", label: "친구", Editor: FriendsEditor, Screen: FriendsScreenPreview },
  { key: "chatList", label: "채팅목록", Editor: ChatListEditor, Screen: ChatListScreenPreview },
  { key: "chat", label: "채팅방", Editor: ChatEditor, Screen: ChatScreenPreview },
  { key: "notification", label: "알림", Editor: NotificationEditor, Screen: NotificationScreenPreview },
] as const satisfies readonly TabDefinition[];

export type TabKey = (typeof TABS)[number]["key"];

// 탭 key로 탭 정의 조회
export const getTab = (key: TabKey): (typeof TABS)[number] =>
  TABS.find((tab) => tab.key === key)!;
