// src/types/theme.ts
export interface SimpleThemeConfig {
  common: {
    icon: string;
    mainTextColor: string;
    mainBGColor: string;
    mainBGImage: string;
    mainDescriptionColor: string;
    profileImage01: string;
    // 친구·채팅목록 화면이 함께 쓰는 값
    mainHighlightedTextColor: string;
    mainDescriptionHighlightedColor: string;
    mainNormalBGColor: string;
    mainSelectedBGColor: string;
    featureTextColor: string;
  };

  friends: {
    headerTextColor: string;
    sectionTitleTextColor: string;
    sectionTitleBorderColor: string;
    addFriendImage: string;
  };

  chatList: {
    paragraphTextColor: string;
    paragraphHighlightedTextColor: string;
  };

  tabBar: {
    bgColor: string;
    bgImage: string;
    friends: string;
    friendsSelected: string;
    chats: string;
    chatsSelected: string;
    now: string;
    nowSelected: string;
    shopping: string;
    shoppingSelected: string;
    more: string;
    moreSelected: string;
  };

  chat: {
    bgImage: string;
    bgColor: string;
  };

  input: {
    bgColor: string;
    sendBGColor: string;
    sendFGColor: string;
    buttonTextColor: string;
    buttonBGColor: string;
    buttonFGColor: string;
  };

  bubble: {
    receive01: string;
    receive02: string;
    send01: string;
    send02: string;
    receiveTextColor: string;
    sendTextColor: string;
    unreadCountColor: string;
    receiveEdgeInsets: string;
    receiveGroupEdgeInsets: string;
    sendEdgeInsets: string;
    sendGroupEdgeInsets: string;
  };

  passcode: {
    bgColor: string;
    titleTextColor: string;
    bgImage: string;
    codeImage01: string;
    codeImage02: string;
    codeImage03: string;
    codeImage04: string;
    codeImage01Selected: string;
    codeImage02Selected: string;
    codeImage03Selected: string;
    codeImage04Selected: string;
    keypadPressed: string;
    keypadBGColor: string;
    keypadTextColor: string;
  };

  notification: {
    bgColor: string;
    messageTextColor: string;
  };
}