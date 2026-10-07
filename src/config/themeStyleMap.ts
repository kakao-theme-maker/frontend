// src/config/themeStyleMap.ts
import type { SimpleThemeConfig } from "@/types/theme";

export interface ColorEntry {
  section: keyof SimpleThemeConfig;
  key: string;
  color: string;
}

interface ColorStyleMapping {
  section: keyof SimpleThemeConfig;
  key: string;
  // ⚠️ 서버의 colorStyleId 값을 채워 넣어야 합니다. null이면 저장 요청에서 제외됩니다.
  colorStyleId: number | null;
}

// 스토어의 색상 값 ↔ 서버 colorStyleId 매핑
export const COLOR_STYLE_MAP: ColorStyleMapping[] = [
  { section: "common", key: "mainTextColor", colorStyleId: null },
  { section: "common", key: "mainBGColor", colorStyleId: null },
  { section: "common", key: "mainDescriptionColor", colorStyleId: null },
  { section: "chat", key: "bgColor", colorStyleId: null },
  { section: "input", key: "bgColor", colorStyleId: null },
  { section: "input", key: "sendBGColor", colorStyleId: null },
  { section: "input", key: "sendFGColor", colorStyleId: null },
  { section: "input", key: "buttonTextColor", colorStyleId: null },
  { section: "input", key: "buttonBGColor", colorStyleId: null },
  { section: "input", key: "buttonFGColor", colorStyleId: null },
  { section: "bubble", key: "receiveTextColor", colorStyleId: null },
  { section: "bubble", key: "sendTextColor", colorStyleId: null },
  { section: "bubble", key: "unreadCountColor", colorStyleId: null },
  { section: "passcode", key: "bgColor", colorStyleId: null },
  { section: "passcode", key: "keypadBGColor", colorStyleId: null },
  { section: "passcode", key: "keypadTextColor", colorStyleId: null },
  { section: "notification", key: "bgColor", colorStyleId: null },
];

interface ImageTypeMapping {
  section: keyof SimpleThemeConfig;
  key: string;
  // ⚠️ 서버의 componentTypeId 값을 채워 넣어야 합니다. null이면 저장 요청에서 제외됩니다.
  componentTypeId: number | null;
}

// 스토어의 이미지 값 ↔ 서버 componentTypeId 매핑 (GET /api/component-types 응답 참고)
export const IMAGE_TYPE_MAP: ImageTypeMapping[] = [
  { section: "common", key: "icon", componentTypeId: null },
  { section: "common", key: "mainBGImage", componentTypeId: null },
  { section: "common", key: "profileImage01", componentTypeId: null },
  { section: "tabBar", key: "bgImage", componentTypeId: null },
  { section: "tabBar", key: "friends", componentTypeId: null },
  { section: "tabBar", key: "friendsSelected", componentTypeId: null },
  { section: "tabBar", key: "chats", componentTypeId: null },
  { section: "tabBar", key: "chatsSelected", componentTypeId: null },
  { section: "tabBar", key: "now", componentTypeId: null },
  { section: "tabBar", key: "nowSelected", componentTypeId: null },
  { section: "tabBar", key: "shopping", componentTypeId: null },
  { section: "tabBar", key: "shoppingSelected", componentTypeId: null },
  { section: "tabBar", key: "more", componentTypeId: null },
  { section: "tabBar", key: "moreSelected", componentTypeId: null },
  { section: "chat", key: "bgImage", componentTypeId: null },
  { section: "bubble", key: "receive01", componentTypeId: null },
  { section: "bubble", key: "receive02", componentTypeId: null },
  { section: "bubble", key: "send01", componentTypeId: null },
  { section: "bubble", key: "send02", componentTypeId: null },
  { section: "passcode", key: "bgImage", componentTypeId: null },
  { section: "passcode", key: "codeImage01", componentTypeId: null },
  { section: "passcode", key: "codeImage02", componentTypeId: null },
  { section: "passcode", key: "codeImage03", componentTypeId: null },
  { section: "passcode", key: "codeImage04", componentTypeId: null },
  { section: "passcode", key: "codeImage01Selected", componentTypeId: null },
  { section: "passcode", key: "codeImage02Selected", componentTypeId: null },
  { section: "passcode", key: "codeImage03Selected", componentTypeId: null },
  { section: "passcode", key: "codeImage04Selected", componentTypeId: null },
  { section: "passcode", key: "keypadPressed", componentTypeId: null },
];
