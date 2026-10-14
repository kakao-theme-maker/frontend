// src/config/themeStyleMap.ts
import type { SimpleThemeConfig } from "@/types/theme";

type Section = keyof SimpleThemeConfig;

interface ColorMapping {
  section: Section;
  key: string;
  // 서버의 styleCode (GET /api/color-styles 의 styleCode)
  styleCode: string;
}

// 스토어의 색상 값 ↔ 서버 styleCode 매핑
export const COLOR_STYLE_MAP: ColorMapping[] = [
  { section: "common", key: "mainTextColor", styleCode: "mainviewStyleTextColor" },
  { section: "common", key: "mainBGColor", styleCode: "mainviewStyleBackgroundColor" },
  { section: "common", key: "mainDescriptionColor", styleCode: "mainviewStyleDescriptionTextColor" },
  { section: "chat", key: "bgColor", styleCode: "chatRoomBackgroundColor" },
  { section: "input", key: "bgColor", styleCode: "inputBarStyleChatBackgroundColor" },
  { section: "input", key: "sendBGColor", styleCode: "inputBarStyleChatSendNormalBackgroundColor" },
  { section: "input", key: "sendFGColor", styleCode: "inputBarStyleChatSendNormalForegroundColor" },
  { section: "input", key: "buttonTextColor", styleCode: "inputBarStyleChatButtonTextColor" },
  { section: "input", key: "buttonBGColor", styleCode: "inputBarStyleChatButtonNormalBackgroundColor" },
  { section: "input", key: "buttonFGColor", styleCode: "inputBarStyleChatButtonNormalForegroundColor" },
  { section: "bubble", key: "receiveTextColor", styleCode: "messageCellStyleReceiveTextColor" },
  { section: "bubble", key: "sendTextColor", styleCode: "messageCellStyleSendTextColor" },
  { section: "bubble", key: "unreadCountColor", styleCode: "messageCellStyleUnreadCountColor" },
  { section: "passcode", key: "bgColor", styleCode: "passcodeBackgroundColor" },
  { section: "passcode", key: "keypadBGColor", styleCode: "passcodeStyleKeypadBackgroundColor" },
  { section: "passcode", key: "keypadTextColor", styleCode: "passcodeStyleKeypadTextNormalColor" },
  { section: "notification", key: "bgColor", styleCode: "messageNotificationBarBackgroundColor" },
];

interface ImageMapping {
  section: Section;
  key: string;
  // 서버의 typeCode (GET /api/component-types 의 typeCode)
  typeCode: string;
  // 말풍선 이미지만 해당: 이 이미지의 여백(padding)이 저장된 bubble 키
  insetKey?: string;
}

// 스토어의 이미지 값 ↔ 서버 typeCode 매핑
// ⚠️ passcode.keypadPressed(키패드 눌림 이미지)는 서버에 대응하는 typeCode가 없어 저장되지 않음
export const IMAGE_TYPE_MAP: ImageMapping[] = [
  { section: "common", key: "icon", typeCode: "commonIcoTheme" },
  { section: "common", key: "mainBGImage", typeCode: "mainviewStylePrimaryBackgroundImage" },
  { section: "common", key: "profileImage01", typeCode: "defaultProfileStyleProfileImage" },
  { section: "tabBar", key: "bgImage", typeCode: "tabbarStyleBackgroundImage" },
  { section: "tabBar", key: "friends", typeCode: "tabbarStyleFriendsNormalIconImage" },
  { section: "tabBar", key: "friendsSelected", typeCode: "tabbarStyleFriendsSelectedIconImage" },
  { section: "tabBar", key: "chats", typeCode: "tabbarStyleChatsNormalIconImage" },
  { section: "tabBar", key: "chatsSelected", typeCode: "tabbarStyleChatsSelectedIconImage" },
  { section: "tabBar", key: "now", typeCode: "tabbarStyleOpenChatsNormalIconImage" },
  { section: "tabBar", key: "nowSelected", typeCode: "tabbarStyleOpenChatsSelectedIconImage" },
  { section: "tabBar", key: "shopping", typeCode: "tabbarStyleShoppingNormalIconImage" },
  { section: "tabBar", key: "shoppingSelected", typeCode: "tabbarStyleShoppingSelectedIconImage" },
  { section: "tabBar", key: "more", typeCode: "tabbarStyleMoreNormalIconImage" },
  { section: "tabBar", key: "moreSelected", typeCode: "tabbarStyleMoreSelectedIconImage" },
  { section: "chat", key: "bgImage", typeCode: "chatRoomBackgroundImage" },
  { section: "bubble", key: "receive01", typeCode: "messageCellStyleReceiveBackgroundImage", insetKey: "receiveEdgeInsets" },
  { section: "bubble", key: "receive02", typeCode: "messageCellStyleReceiveGroupBackgroundImage", insetKey: "receiveGroupEdgeInsets" },
  { section: "bubble", key: "send01", typeCode: "messageCellStyleSendBackgroundImage", insetKey: "sendEdgeInsets" },
  { section: "bubble", key: "send02", typeCode: "messageCellStyleSendGroupBackgroundImage", insetKey: "sendGroupEdgeInsets" },
  { section: "passcode", key: "bgImage", typeCode: "passcodeBackgroundImage" },
  { section: "passcode", key: "codeImage01", typeCode: "passcodeStyleBulletFirstImage" },
  { section: "passcode", key: "codeImage02", typeCode: "passcodeStyleBulletSecondImage" },
  { section: "passcode", key: "codeImage03", typeCode: "passcodeStyleBulletThirdImage" },
  { section: "passcode", key: "codeImage04", typeCode: "passcodeStyleBulletFourthImage" },
  { section: "passcode", key: "codeImage01Selected", typeCode: "passcodeStyleBulletSelectedFirstImage" },
  { section: "passcode", key: "codeImage02Selected", typeCode: "passcodeStyleBulletSelectedSecondImage" },
  { section: "passcode", key: "codeImage03Selected", typeCode: "passcodeStyleBulletSelectedThirdImage" },
  { section: "passcode", key: "codeImage04Selected", typeCode: "passcodeStyleBulletSelectedFourthImage" },
];

// 스토어의 이미지 항목에 해당하는 서버 typeCode 조회 (없으면 빈 문자열)
export function typeCodeOf(section: Section, key: string): string {
  return IMAGE_TYPE_MAP.find((item) => item.section === section && item.key === key)?.typeCode ?? "";
}