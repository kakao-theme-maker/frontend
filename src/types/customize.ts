export type SettingItemType = 'color' | 'size' | 'image';

export interface SettingItem {
  key: string;
  label: string;
  type: SettingItemType;
  value: string;
}

export interface SettingSection {
  title: string;
  hasTabToggle?: boolean;
  items: SettingItem[];
}

export type TabKey =
  | 'passcode'
  | 'bubble'
  | 'layout'
  | 'friends'
  | 'chatList'
  | 'chat'
  | 'notification';