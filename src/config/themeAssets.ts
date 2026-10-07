// src/config/themeAssets.ts
export const TAB_ICON_COLUMNS = [
  { key: "friends", selectedKey: "friendsSelected", label: "친구탭" },
  { key: "chats", selectedKey: "chatsSelected", label: "채팅탭" },
  { key: "now", selectedKey: "nowSelected", label: "지금탭" },
  { key: "shopping", selectedKey: "shoppingSelected", label: "쇼핑탭" },
  { key: "more", selectedKey: "moreSelected", label: "더보기탭" },
] as const;

export const CODE_IMAGE_COLUMNS = [
  { key: "codeImage01", selectedKey: "codeImage01Selected", label: "첫 번째" },
  { key: "codeImage02", selectedKey: "codeImage02Selected", label: "두 번째" },
  { key: "codeImage03", selectedKey: "codeImage03Selected", label: "세 번째" },
  { key: "codeImage04", selectedKey: "codeImage04Selected", label: "네 번째" },
] as const;
