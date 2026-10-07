// src/store/customizeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SimpleThemeConfig } from '@/types/theme'
import type { ColorEntry } from '@/config/themeStyleMap'

import defaultIcon from '@/assets/images/commonIcoTheme.png'
import defaultMainBGImage from '@/assets/images/mainBgImage.png'
import defaultProfileImage01 from '@/assets/images/profileImg01.png'
import defaultTabBgImage from '@/assets/images/maintabBgImage.png'
import defaultTabFriends from '@/assets/images/maintabIcoFriends.png'
import defaultTabFriendsSelected from '@/assets/images/maintabIcoFriendsSelected.png'
import defaultTabChats from '@/assets/images/maintabIcoChats.png'
import defaultTabChatsSelected from '@/assets/images/maintabIcoChatsSelected.png'
import defaultTabNow from '@/assets/images/maintabIcoNow.png'
import defaultTabNowSelected from '@/assets/images/maintabIcoNowSelected.png'
import defaultTabShopping from '@/assets/images/maintabIcoShopping.png'
import defaultTabShoppingSelected from '@/assets/images/maintabIcoShoppingSelected.png'
import defaultTabMore from '@/assets/images/maintabIcoMore.png'
import defaultTabMoreSelected from '@/assets/images/maintabIcoMoreSelected.png'
import defaultChatBgImage from '@/assets/images/chatroomBgImage.png'
import defaultBubbleReceive01 from '@/assets/images/chatroomBubbleReceive01.png'
import defaultBubbleReceive02 from '@/assets/images/chatroomBubbleReceive02.png'
import defaultBubbleSend01 from '@/assets/images/chatroomBubbleSend01.png'
import defaultBubbleSend02 from '@/assets/images/chatroomBubbleSend02.png'
import defaultPasscodeBgImage from '@/assets/images/passcodeBgImage.png'
import defaultCodeImage01 from '@/assets/images/passcodeImgCode01.png'
import defaultCodeImage02 from '@/assets/images/passcodeImgCode02.png'
import defaultCodeImage03 from '@/assets/images/passcodeImgCode03.png'
import defaultCodeImage04 from '@/assets/images/passcodeImgCode04.png'
import defaultCodeImage01Selected from '@/assets/images/passcodeImgCode01Selected.png'
import defaultCodeImage02Selected from '@/assets/images/passcodeImgCode02Selected.png'
import defaultCodeImage03Selected from '@/assets/images/passcodeImgCode03Selected.png'
import defaultCodeImage04Selected from '@/assets/images/passcodeImgCode04Selected.png'
import defaultKeypadPressed from '@/assets/images/passcodeKeypadPressed.png'

const DEFAULT_COMMON: SimpleThemeConfig['common'] = {
  icon: defaultIcon,
  mainTextColor: '#664242',
  mainBGColor: '#FFDEDE',
  mainBGImage: defaultMainBGImage,
  mainDescriptionColor: '#805959',
  profileImage01: defaultProfileImage01,
}

const DEFAULT_TAB_BAR: SimpleThemeConfig['tabBar'] = {
  bgImage: defaultTabBgImage,
  friends: defaultTabFriends,
  friendsSelected: defaultTabFriendsSelected,
  chats: defaultTabChats,
  chatsSelected: defaultTabChatsSelected,
  now: defaultTabNow,
  nowSelected: defaultTabNowSelected,
  shopping: defaultTabShopping,
  shoppingSelected: defaultTabShoppingSelected,
  more: defaultTabMore,
  moreSelected: defaultTabMoreSelected,
}

const DEFAULT_CHAT: SimpleThemeConfig['chat'] = {
  bgImage: defaultChatBgImage,
  bgColor: '#FFDEDE',
}

const DEFAULT_INPUT: SimpleThemeConfig['input'] = {
  bgColor: '#FFFFFF',
  sendBGColor: '#FF7F7F',
  sendFGColor: '#FFFFFF',
  buttonTextColor: '#191919',
  buttonBGColor: '#F5F5F5',
  buttonFGColor: '#E86464',
}

const DEFAULT_BUBBLE: SimpleThemeConfig['bubble'] = {
  receive01: `${defaultBubbleReceive01} 17px 17px`,
  receive02: `${defaultBubbleReceive02} 17px 17px`,
  send01: `${defaultBubbleSend01} 22px 17px`,
  send02: `${defaultBubbleSend02} 22px 17px`,
  receiveTextColor: '#4D4D4D',
  sendTextColor: '#FFFFFF',
  unreadCountColor: '#FF7F7F',
  receiveEdgeInsets: '10px 17px 7px 11px',
  receiveGroupEdgeInsets: '10px 17px 7px 11px',
  sendEdgeInsets: '10px 11px 7px 17px',
  sendGroupEdgeInsets: '10px 11px 7px 17px',
}

const DEFAULT_PASSCODE: SimpleThemeConfig['passcode'] = {
  bgColor: '#FFDEDE',
  bgImage: defaultPasscodeBgImage,
  codeImage01: defaultCodeImage01,
  codeImage02: defaultCodeImage02,
  codeImage03: defaultCodeImage03,
  codeImage04: defaultCodeImage04,
  codeImage01Selected: defaultCodeImage01Selected,
  codeImage02Selected: defaultCodeImage02Selected,
  codeImage03Selected: defaultCodeImage03Selected,
  codeImage04Selected: defaultCodeImage04Selected,
  keypadPressed: defaultKeypadPressed,
  keypadBGColor: '#FFF2F2',
  keypadTextColor: '#664242',
}

const DEFAULT_NOTIFICATION: SimpleThemeConfig['notification'] = {
  bgColor: '#FCC5C5',
}

export interface ThemeStore {
  theme: SimpleThemeConfig
  themeName: string

  setThemeName: (name: string) => void

  setCommon: (style: Partial<SimpleThemeConfig['common']>) => void
  setTabBar: (style: Partial<SimpleThemeConfig['tabBar']>) => void
  setChat: (style: Partial<SimpleThemeConfig['chat']>) => void
  setInput: (style: Partial<SimpleThemeConfig['input']>) => void
  setBubble: (style: Partial<SimpleThemeConfig['bubble']>) => void
  setPasscode: (style: Partial<SimpleThemeConfig['passcode']>) => void
  setNotification: (style: Partial<SimpleThemeConfig['notification']>) => void

  // 서버에서 불러온 테마 이름과 색상을 반영
  applyServerTheme: (name: string, colors: ColorEntry[]) => void

  resetAll: () => void
}

const DEFAULT_THEME: SimpleThemeConfig = {
  common: DEFAULT_COMMON,
  tabBar: DEFAULT_TAB_BAR,
  chat: DEFAULT_CHAT,
  input: DEFAULT_INPUT,
  bubble: DEFAULT_BUBBLE,
  passcode: DEFAULT_PASSCODE,
  notification: DEFAULT_NOTIFICATION,
}

// 테마의 한 섹션만 부분 갱신하는 상태 업데이터 생성
const updateSection =
  <K extends keyof SimpleThemeConfig>(section: K, style: Partial<SimpleThemeConfig[K]>) =>
    (state: ThemeStore) => ({
      theme: { ...state.theme, [section]: { ...state.theme[section], ...style } },
    })

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: { ...DEFAULT_THEME },
      themeName: '',

      // 테마 이름 변경
      setThemeName: (name) => set({ themeName: name }),

      // 공통 스타일 부분 갱신
      setCommon: (style) => set(updateSection('common', style)),

      // 탭바 스타일 부분 갱신
      setTabBar: (style) => set(updateSection('tabBar', style)),

      // 채팅방 스타일 부분 갱신
      setChat: (style) => set(updateSection('chat', style)),

      // 입력창 스타일 부분 갱신
      setInput: (style) => set(updateSection('input', style)),

      // 말풍선 스타일 부분 갱신
      setBubble: (style) => set(updateSection('bubble', style)),

      // 잠금화면 스타일 부분 갱신
      setPasscode: (style) => set(updateSection('passcode', style)),

      // 알림 스타일 부분 갱신
      setNotification: (style) => set(updateSection('notification', style)),

      // 테마 전체를 기본값으로 초기화
      // 서버에서 불러온 테마 이름과 색상을 반영
      applyServerTheme: (name, colors) =>
        set((state) => {
          const theme = structuredClone(state.theme) as unknown as Record<string, Record<string, string>>
          for (const { section, key, color } of colors) {
            if (theme[section]) theme[section][key] = color
          }
          return { theme: theme as unknown as SimpleThemeConfig, themeName: name }
        }),

      resetAll: () => set({ theme: { ...DEFAULT_THEME }, themeName: '' }),
    }),
    {
      name: 'theme-store',
    }
  )
)